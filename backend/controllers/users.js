const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const {
  AssignReport,
  Users,
  Companies,
  Plans,
  BasePlans,
  UserProjects,
  Projects,
} = require("../models");
const { Op } = require("sequelize");

const getUsers = async (req, res) => {
  const { projectId, list } = req.query;

  try {
    if (projectId && list == undefined) {
      const users = await UserProjects.findAll({
        where: {
          ProjectId: projectId,
        },
        include: [
          {
            model: Users,
            attributes: {
              exclude: ["password"],
            },
          },
        ],
      });
      res.json(users.map(({ User, ...rest }) => ({ ...User, ...rest })));
      return;
    }
    const users = await Users.findAll({
      where: {
        CompanyId: req.user.companyId,
      },
      attributes: {
        exclude: ["password"],
      },
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch" });
  }
};

const isEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const createUser = async (req, res) => {
  const permissions = ["super-admin"];
  if (!permissions.includes(req.user?.role))
    return res.status(403).json({ message: "Forbidden" });

  const {
    fullname,
    password,
    role,
    email,
    jobDesc,
    department,
    userProject,
    project,
    projectName,
    projectLocation,
  } = req.body;
  if (!fullname)
    return res.status(400).json({ message: "Full name is required" });
  if (!email) return res.status(400).json({ message: "Email is required" });
  if (!isEmail(email))
    return res.status(400).json({ message: "Email is not valid" });
  if (!password)
    return res.status(400).json({ message: "Password is required" });
  if (!jobDesc)
    return res.status(400).json({ message: "Job description is required" });
  if (!department)
    return res.status(400).json({ message: "Department is required" });
  if (!role) return res.status(400).json({ message: "Role is required" });
  if (!userProject)
    return res.status(400).json({ message: "User project is required" });
  if (userProject == "new") {
    if (!projectName)
      return res.status(400).json({ message: "Project name is required" });
    if (!projectLocation)
      return res.status(400).json({ message: "Project location is required" });
  } else if (!project) {
    return res.status(400).json({ message: "Project is required" });
  }

  try {
    const emailExists = await Users.findOne({ where: { email } });
    if (emailExists)
      return res.status(404).json({ message: "Email must be unique" });

    const company = await Companies.findByPk(req.user.companyId, {
      include: [
        {
          model: Plans,
          include: [
            {
              model: BasePlans,
            },
          ],
        },
      ],
    });
    if (!company)
      return res.status(404).json({ message: "Something went wrong" });
    const companyUsersCount = await Users.count({
      where: {
        CompanyId: company.id,
        role: "user",
      },
    });
    const companyAdminsCount = await Users.count({
      where: {
        CompanyId: company.id,
        role: {
          [Op.or]: ["admin", "super-admin"],
        },
      },
    });
    const planUsersCount =
      company.Plan.customUsersCount || company.Plan.BasePlan.usersCount;
    if (role === "user" && companyUsersCount >= planUsersCount)
      return res.status(400).json({
        message: `You can only have ${planUsersCount} users on this plan`,
      });

    const planAdminsCount =
      company.Plan.customAdminsCount || company.Plan.BasePlan.adminsCount;
    if (role === "admin" && companyAdminsCount >= planAdminsCount)
      return res.status(400).json({
        message: `You can only have ${planAdminsCount} admin${
          planAdminsCount > 1 ? "s" : ""
        } on this plan`,
      });

    const hashed = await hash(password, 10);

    const createdUser = await Users.create({
      fullname,
      password: hashed,
      role,
      email,
      CompanyId: req.user.companyId,
      jobDesc,
      department,
    });

    if (userProject == "new") {
      const createdProject = await Projects.create({
        name: projectName,
        location: projectLocation,
        CompanyId: req.user.companyId,
      });
      await UserProjects.create({
        UserId: createdUser.id,
        ProjectId: createdProject.id,
      });
      // } else {
      await UserProjects.create({
        UserId: createdUser.id,
        ProjectId: project,
      });
    }

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: "Failed to create" });
  }
};

const register = async (req, res) => {
  // const {
  //   name,
  //   password,
  //   country,
  //   fullname,
  //   plan,
  //   orgNumber,
  //   phoneNumber,
  //   email,
  //   address1,
  //   address2,
  //   city,
  //   zipCode,
  //   projectName,
  //   projectLocation,
  //   adminEmail,
  //   confirmPassword,
  // } = req.body;
  // if (!name)
  //   return res.status(400).json({ message: "Company name is required" });
  // if (!email)
  //   return res.status(400).json({ message: "Company email is required" });
  // if (!isEmail(email))
  //   return res.status(400).json({ message: "Company email is not valid" });
  // if (!country)
  //   return res.status(400).json({ message: "Company country is required" });
  // if (!orgNumber)
  //   return res.status(400).json({
  //     message: "Company organization number is required",
  //   });
  // if (!phoneNumber)
  //   return res.status(400).json({
  //     message: "Company phone number is required",
  //   });
  // if (!address1)
  //   return res.status(400).json({ message: "Address 1 is required" });
  // if (!city) return res.status(400).json({ message: "City is required" });
  // if (!zipCode)
  //   return res.status(400).json({ message: "Zip code is required" });
  // if (!fullname)
  //   return res.status(400).json({ message: "Admin full name is required" });
  // if (!adminEmail)
  //   return res.status(400).json({ message: "Admin email is required" });
  // if (!isEmail(adminEmail))
  //   return res.status(400).json({ message: "Admin email is not valid" });
  // if (!password)
  //   return res.status(400).json({ message: "Password is required" });
  // if (!confirmPassword)
  //   return res.status(400).json({ message: "Confirm password is required" });
  // if (password !== confirmPassword)
  //   return res.status(400).json({ message: "Passwords do not match" });
  // if (!plan) return res.status(400).json({ message: "Plan is required" });
  // if (!projectName)
  //   return res.status(400).json({ message: "Project name is required" });
  // if (!projectLocation)
  //   return res.status(400).json({ message: "Project location is required" });
  
  // try {
  //   const adminEmailExists = await Users.findOne({
  //     where: { email: adminEmail },
  //   });
  //   if (adminEmailExists)
  //     return res.status(404).json({ message: "Admin email must be unique" });
  //   const companyNameExists = await Companies.findOne({ where: { name } });
  //   if (companyNameExists)
  //     return res.status(404).json({ message: "Company name must be unique" });
  //   const companyEmailExists = await Companies.findOne({ where: { email } });
  //   if (companyEmailExists)
  //     return res.status(404).json({ message: "Company email must be unique" });
  
  //   const createdPlan = await Plans.create({
  //     BasePlanId: plan,
  //   });
  //   const createdCompany = await Companies.create({
  //     name,
  //     PlanId: createdPlan.id,
  //     country,
  //     orgNumber,
  //     phoneNumber,
  //     email,
  //     address1,
  //     address2,
  //     city,
  //     zipCode,
  //   });
  
  //   const hashed = await hash(password, 10);
  
  //   const createdUser = await Users.create({
  //     fullname,
  //     password: hashed,
  //     role: "super-admin",
  //     CompanyId: createdCompany.id,
  //     email: adminEmail,
  //   });
  
  //   const createdProject = await Projects.create({
  //     name: projectName,
  //     location: projectLocation,
  //     CompanyId: createdCompany.id,
  //   });
  
  //   await UserProjects.create({
  //     UserId: createdUser.id,
  //     ProjectId: createdProject.id,
  //   });
  
  //   res.json({
  //     message: "Registered successfully, Redirecting...",
  //   });
  // } catch (err) {
  //   console.log(err);
  
  //   res.status(500).json({ message: "Failed to login" });
  // }
  const {
    name,
    password,
    country,
    fullname,
   // plan,
    orgNumber,
    phoneNumber,
    email,
    address1,
    address2,
    city,
    zipCode,
    adminEmail,
    confirmPassword,
  } = req.body;

  if (!name)
    return res.status(400).json({ message: "Company name is required" });
  if (!email)
    return res.status(400).json({ message: "Company email is required" });
  if (!isEmail(email))
    return res.status(400).json({ message: "Company email is not valid" });
  if (!country)
    return res.status(400).json({ message: "Company country is required" });
  if (!orgNumber)
    return res.status(400).json({
      message: "Company organization number is required",
    });
  if (!phoneNumber)
    return res.status(400).json({
      message: "Company phone number is required",
    });
  if (!address1)
    return res.status(400).json({ message: "Address 1 is required" });
  if (!city) return res.status(400).json({ message: "City is required" });
  if (!zipCode)
    return res.status(400).json({ message: "Zip code is required" });
  if (!fullname)
    return res.status(400).json({ message: "Admin full name is required" });
  if (!adminEmail)
    return res.status(400).json({ message: "Admin email is required" });
  if (!isEmail(adminEmail))
    return res.status(400).json({ message: "Admin email is not valid" });
  if (!password)
    return res.status(400).json({ message: "Password is required" });
  if (!confirmPassword)
    return res.status(400).json({ message: "Confirm password is required" });
  if (password !== confirmPassword)
    return res.status(400).json({ message: "Passwords do not match" });
  //if (!plan) return res.status(400).json({ message: "Plan is required" });

  try {
    const adminEmailExists = await Users.findOne({
      where: { email: adminEmail },
    });
    if (adminEmailExists)
      return res.status(404).json({ message: "Admin email must be unique" });

    const companyNameExists = await Companies.findOne({ where: { name } });
    if (companyNameExists)
      return res.status(404).json({ message: "Company name must be unique" });

    const companyEmailExists = await Companies.findOne({ where: { email } });
    if (companyEmailExists)
      return res.status(404).json({ message: "Company email must be unique" });

    // const createdPlan = await Plans.create({
    //   BasePlanId: plan,
    // });

    const createdCompany = await Companies.create({
      name,
      //PlanId: createdPlan.id,
      country,
      orgNumber,
      phoneNumber,
      email,
      address1,
      address2,
      city,
      zipCode,
    });

    const hashed = await hash(password, 10);

    await Users.create({
      fullname,
      password: hashed,
      role: "super-admin",
      CompanyId: createdCompany.id,
      email: adminEmail,
    });

    res.json({
      message: "Registered successfully, Redirecting...",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to register" });
  }
};

const deleteUser = async (req, res) => {
  const permissions = ["super-admin"];
  if (!permissions.includes(req.user?.role))
    return res.status(403).json({ message: "Forbidden" });

  const { id } = req.query;
  if (!id) return res.status(400).json({ message: "ID is required" });

  if (id == req.user.id)
    return res.status(400).json({ message: "You cannot delete yourself" });

  try {
    const user = await Users.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role == "super-admin")
      return res.status(400).json({
        message: "You cannot delete the super admin",
      });

    const isUserInReport = await AssignReport.findAll({
      where: { UserId: id },
    });
    if (isUserInReport.length > 0)
      return res.status(400).json({
        message: "You can't delete a user assigned to a report",
      });

    await Users.destroy({ where: { id } });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete" });
  }
};

const login = async (req, res) => {
  // const { email, password } = req.body;
  // if (!email) return res.status(400).json({ message: "Email is required" });
  // if (!password)
  //   return res.status(400).json({ message: "Password is required" });

  // try {
  //   const user = await Users.findOne({
  //     where: { email },
  //     include: [Companies],
  //   });
  //   if (!user) return res.status(404).json({ message: "User not found" });

  //   const isMatch =
  //     (await compare(password, user.password)) || user.password == password;
  //   if (!isMatch) return res.status(401).json({ message: "Invalid password" });

  //   if (
  //     user.Company.subscriptionEndsAt < new Date() &&
  //     user.role != "super-admin"
  //   )
  //     return res.status(403).json({
  //       message: "Subscription has expired, contact your admin",
  //     });

  //   const projects = await UserProjects.findAll({
  //     where: { UserId: user.id },
  //     include: Projects,
  //   });

  //   var token = sign(
  //     {
  //       role: user.role,
  //       id: user.id,
  //       email: user.email,
  //       fullname: user.fullname,
  //       companyId: user.CompanyId,
  //       subscriptionEndsAt: user.Company.subscriptionEndsAt,
  //       subscriptionType: user.Company.subscriptionType,
  //     },
  //     process.env.JWT_SECRET
  //   );

  //   res.json({
  //     message: "Logged in successfully, Redirecting...",
  //     token,
  //     // activeProject: {
  //     //   name: projects[0].Project.name,
  //     //   id: projects[0].Project.id,
  //     // },
  //   });
  // } catch (err) {
  //   console.log(err);

  //   res.status(500).json({ message: "Failed to login" });
  // }
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });
  if (!password)
    return res.status(400).json({ message: "Password is required" });

  try {
    const user = await Users.findOne({
      where: { email },
      include: [Companies],
    });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch =
      (await compare(password, user.password)) || user.password == password;
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    if (
      user.Company.subscriptionEndsAt < new Date() &&
      user.role !== "super-admin"
    ) {
      return res.status(403).json({
        message: "Subscription has expired, contact your admin",
      });
    }

    const token = sign(
      {
        role: user.role,
        id: user.id,
        email: user.email,
        fullname: user.fullname,
        companyId: user.CompanyId,
        subscriptionEndsAt: user.Company.subscriptionEndsAt,
        subscriptionType: user.Company.subscriptionType,
      },
      process.env.JWT_SECRET
    );

    res.json({
      message: "Logged in successfully, Redirecting...",
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to login" });
  }
};

module.exports = { getUsers, createUser, deleteUser, login, register };
