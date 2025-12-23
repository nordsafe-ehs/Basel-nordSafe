import { LinkType } from "../../types/Sidebar";
import { badWeather } from "./forms/badWeather";
import { concreteWork } from "./forms/concreteWork";
import { confinedSpaces } from "./forms/confinedSpaces";
import { constructionAtSea } from "./forms/constructionAtSea";
import { constructionNearPedestrians } from "./forms/constructionNearPedestrians";
import { constructionNearPedestriansInfrastructure } from "./forms/constructionNearPedestriansInfrastructure";
import { constructionNearSchoolsHospitals } from "./forms/constructionNearSchoolsHospitals";
import { dustHandling } from "./forms/dustHandling";
import { electricalWork } from "./forms/electricalWork";
import { ergonomicsHeavyObjects } from "./forms/ergonomicsHeavyObjects";
import { excavationWork } from "./forms/excavationWork";
import { hazardousChemicals } from "./forms/hazardousChemicals";
import { highVoltage } from "./forms/highVoltage";
import { hotWork } from "./forms/hotWork";
import { liftingOperation } from "./forms/liftingOperation";
import { rockBlasting } from "./forms/rockBlasting";
import { ventilationSystems } from "./forms/ventilationSystems";
import { vibratingEquipment } from "./forms/vibratingEquipment";
import { workAtHeight } from "./forms/workAtHeight";

export const checklists: LinkType[] = [
  concreteWork,
  constructionNearPedestrians,
  excavationWork,
  rockBlasting,
  workAtHeight,
  liftingOperation,
  constructionNearSchoolsHospitals,
  constructionAtSea,
  constructionNearPedestriansInfrastructure,
  hazardousChemicals,
  dustHandling,
  badWeather,
  ventilationSystems,
  ergonomicsHeavyObjects,
  vibratingEquipment,
  confinedSpaces,
  highVoltage,
  electricalWork,
  hotWork
];
