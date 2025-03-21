
import { BusUpdate } from "../types/busTypes";

// Sample data for recent bus updates
export const recentUpdates: BusUpdate[] = [
  {
    id: "update-1",
    routeId: "industrial-113.2",
    time: "12:45",
    status: "Em movimento normal",
    coordinates: { x: "35%", y: "35%" },
    hasIssue: false
  },
  {
    id: "update-2",
    routeId: "sao-caetano-via-setor-leste-113.3",
    time: "12:50",
    status: "Em movimento normal",
    coordinates: { x: "65%", y: "40%" },
    hasIssue: false
  },
  {
    id: "update-3",
    routeId: "setor-leste-113.3",
    time: "12:30",
    status: "Atrasado em 10 minutos",
    coordinates: { x: "55%", y: "48%" },
    hasIssue: true
  }
];
