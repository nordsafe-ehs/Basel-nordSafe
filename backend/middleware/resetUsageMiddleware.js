const { Companies } = require("../models");

const resetUsageMiddleware = async (req, res, next) => {
  try {
    const companyId = req.user?.companyId;
    if (!companyId) return next();

    const company = await Companies.findByPk(companyId);
    if (!company) return next();

    const now = new Date();
    const lastUpdate = company.lastUsageUpdate || new Date(0);
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    if (lastUpdate < oneMonthAgo) {
      await Companies.update(
        {
          lastUsageUpdate: now,
          monthlySDSSearchUsage: 0,
          monthlySDSSaveUsage: 0,
        },
        {
          where: {
            id: companyId,
          },
        }
      );

      console.log(`Usage reset for company ${company.id}`);
    }

    next();
  } catch (error) {
    console.error("Error in resetUsageMiddleware:", error);
    next();
  }
};

module.exports = resetUsageMiddleware;
