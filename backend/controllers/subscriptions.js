const { Op } = require("sequelize");
const { Companies, Plans, BasePlans, Users, Projects } = require("../models");
const Stripe = require("stripe");

const getSubscriptionDetails = async (req, res) => {
  const permissions = ["admin", "super-admin"];
  if (!permissions.includes(req.user?.role))
    return res.status(403).json({ message: "Forbidden" });

  try {
    const company = await Companies.findByPk(req.user.companyId, {
      include: {
        model: Plans,
        include: [
          {
            model: BasePlans,
          },
        ],
      },
    });
    const usersCount = await Users.count({
      where: {
        CompanyId: req.user.companyId,
        role: "user",
      },
    });
    const adminsCount = await Users.count({
      where: {
        CompanyId: req.user.companyId,
        role: {
          [Op.or]: ["admin", "super-admin"],
        },
      },
    });
    const projectsCount = await Projects.count({
      where: {
        CompanyId: req.user.companyId,
      },
    });

    return res.json({
      status:
        company.subscriptionEndsAt < Date.now()
          ? "expired"
          : company.subscriptionType == "free trial"
          ? "trial"
          : "active",
      plan: company.Plan.BasePlan.name,
      price: company.Plan.BasePlan.price,
      subscriptionEndsAt: company.subscriptionEndsAt,
      paymentLink: company.Plan.BasePlan.paymentLink,
      companyEmail: company.email,
      usage: {
        users: {
          used: usersCount,
          limit:
            company.Plan.customUsersCount || company.Plan.BasePlan.usersCount,
        },
        admins: {
          used: adminsCount,
          limit:
            company.Plan.customAdminsCount || company.Plan.BasePlan.adminsCount,
        },
        projects: {
          used: projectsCount,
          limit:
            company.Plan.customProjectsCount ||
            company.Plan.BasePlan.projectsCount,
        },
        sdsSearch: {
          used: company.monthlySDSSearchUsage,
          limit:
            company.Plan.customMonthlySDSSearchCount ||
            company.Plan.BasePlan.monthlySDSSearchCount,
        },
        sdsSave: {
          used: company.monthlySDSSaveUsage,
          limit:
            company.Plan.customMonthlySDSSaveCount ||
            company.Plan.BasePlan.monthlySDSSaveCount,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch" });
  }
};

const webhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  if (event.type !== "checkout.session.completed")
    return res.status(400).send(`The event type is not supported`);
  const session = await stripe.checkout.sessions.retrieve(
    event.data.object.id,
    {
      expand: ["line_items", "customer"],
    }
  );

  if (!session) return res.status(400).send(`No session found`);

  const email = session.customer?.email;

  if (!email) return res.status(400).send(`No email found`);

  const productId = session?.line_items?.data?.[0]?.price?.product;

  if (!productId) return res.status(400).send(`No product found`);

  const plan = await BasePlans.findOne({
    where: {
      productId,
    },
  });

  if (!plan) return res.status(400).send(`No plan found`);

  const company = await Companies.findOne({
    where: {
      email,
    },
    include: {
      model: Plans,
    },
  });

  if (!company) return res.status(400).send(`No company found`);

  await Plans.update(
    {
      BasePlanId: plan.id,
    },
    {
      where: {
        id: company.Plan.id,
      },
    }
  );

  const now = new Date();
  now.setMonth(now.getMonth() + 1);
  await Companies.update(
    {
      subscriptionType: "plan",
      subscriptionEndsAt: now,
      monthlySDSSearchUsage: 0,
      monthlySDSSaveUsage: 0,
    },
    {
      where: {
        email,
      },
    }
  );

  res.send();
};

module.exports = { getSubscriptionDetails, webhook };
