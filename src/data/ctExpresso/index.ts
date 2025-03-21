
import { BusRoute } from "../../types/busTypes";
import { ctExpressoRoutes001to003 } from "./ctExpressoRoutes001to003";
import { ctExpressoRoutes004to006 } from "./ctExpressoRoutes004to006";
import { ctExpressoRoutes007to010 } from "./ctExpressoRoutes007to010";
import { ctExpressoRoutes011to013 } from "./ctExpressoRoutes011to013";
import { ctExpressoRoutes014to016 } from "./ctExpressoRoutes014to016";
import { ctExpressoRoutes017to022 } from "./ctExpressoRoutes017to022";

// Combine all CT Expresso routes
export const ctExpressoRoutes: BusRoute[] = [
  ...ctExpressoRoutes001to003,
  ...ctExpressoRoutes004to006,
  ...ctExpressoRoutes007to010
];

export const ctExpressoRoutes2: BusRoute[] = [
  ...ctExpressoRoutes011to013,
  ...ctExpressoRoutes014to016
];

export const ctExpressoRoutes3: BusRoute[] = [
  ...ctExpressoRoutes017to022
];
