const {
  Projects,
  Companies,
  Reports,
  Plans,
  BasePlans,
  UserProjects,
  Users,
} = require("../models");

const getProjects = async (req, res) => {
  const { list } = req.query;

  try {
    if (list == "") {
      const projects = await Projects.findAll({
        where: {
          CompanyId: req.user.companyId,
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

      return res.json(
        projects.map((p) => ({ ...p, users: JSON.stringify(p.Users) }))
      );
    }
    const projects = await Users.findByPk(req.user.id, {
      include: [
        {
          model: Projects,
          include: [
            {
              model: Users,
              attributes: {
                exclude: ["password"],
              },
            },
          ],
        },
      ],
    });

    res.json(
      projects.Projects.map((p) => ({ ...p, users: JSON.stringify(p.Users) }))
    );
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: "Failed to fetch" });
  }
};

const createProject = async (req, res) => {
  const permissions = ["admin", "super-admin"];
  if (!permissions.includes(req.user?.role))
    return res.status(403).json({ message: "Forbidden" });

  const { name, location } = req.body;
  if (!name) return res.status(400).json({ message: "Name is required" });
  if (!location)
    return res.status(400).json({ message: "Location is required" });

  try {
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
    const companyProjectsCount = await Projects.count({
      where: {
        CompanyId: company.id,
      },
    });

    const planProjectsCount =
      company.Plan.customProjectsCount || company.Plan.BasePlan.projectsCount;
    if (!company.Plan || !company.Plan.BasePlan) {
      return res
        .status(400)
        .json({ message: "Company plan is not configured properly" });
    }

    if (companyProjectsCount >= planProjectsCount)
      return res.status(400).json({
        message: `You can only have ${planProjectsCount} projects on this plan`,
      });

    const newProject = await Projects.create({
      name,
      location,
      CompanyId: company.id,
    });
    await Users.create({
      UserId: req.user.id,
      ProjectId: newProject.id,
    });

    res.status(201).json({ message: "Project created successfully" });
  } catch (err) {
    console.log("error", err);

    res.status(500).json({ message: "Failed to create" });
  }
};

const deleteProject = async (req, res) => {
  const permissions = ["admin", "super-admin"];
  if (!permissions.includes(req.user?.role))
    return res.status(403).json({ message: "Forbidden" });

  const { id } = req.query;
  if (!id) return res.status(400).json({ message: "ID is required" });

  try {
    const project = await Projects.findByPk(id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const report = await Reports.findOne({
      where: {
        ProjectId: project.id,
      },
    });
    if (report)
      return res.status(400).json({
        message: "You can't delete a project that is connected to a report ",
      });

    await Projects.destroy({ where: { id } });

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete" });
  }
};

const users = async (req, res) => {
  const permissions = ["admin", "super-admin"];
  if (!permissions.includes(req.user?.role))
    return res.status(403).json({ message: "Forbidden" });

  const { users, projectId } = req.body;

  if (!projectId)
    return res.status(404).json({ message: "Invalid project id" });

  try {
    const project = await Projects.findByPk(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const { Op } = require("sequelize");

    const existingUserProjects = await UserProjects.findAll({
      where: { ProjectId: projectId },
    });

    const existingUserIds = existingUserProjects.map((up) => up.UserId);

    const usersToRemove = existingUserIds.filter(
      (userId) => !users.includes(userId)
    );
    const usersToAdd = users.filter(
      (userId) => !existingUserIds.includes(userId)
    );

    if (usersToRemove.length > 0)
      await UserProjects.destroy({
        where: {
          ProjectId: projectId,
          UserId: {
            [Op.in]: usersToRemove,
          },
        },
      });

    if (usersToAdd.length > 0) {
      const recordsToCreate = usersToAdd.map((userId) => ({
        ProjectId: projectId,
        UserId: userId,
      }));

      await UserProjects.bulkCreate(recordsToCreate);
    }

    res.status(200).json({ message: "Project users updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update" });
  }
};

module.exports = { getProjects, createProject, deleteProject, users };
