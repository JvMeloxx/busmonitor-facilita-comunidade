
// Bus route types and data
export interface BusStop {
  id: string;
  name: string;
  address: string;
  coordinates: {
    x: string; // CSS positioning for mock map
    y: string; // CSS positioning for mock map
  };
}

export interface BusRoute {
  id: string;
  number: number;
  name: string;
  description: string;
  color: string;
  frequency: string;
  stops: BusStop[];
  scheduleTimes: string[];
  returnScheduleTimes: string[];
  nextScheduledTime: string;
  pathCoordinates: string; // SVG path for route visualization
  longDescription?: string;
}

export interface BusUpdate {
  id: string;
  routeId: string;
  time: string;
  status: string;
  coordinates: {
    x: string; // CSS positioning for mock map
    y: string; // CSS positioning for mock map
  };
  hasIssue: boolean;
}

// Sample data for bus routes
export const busRoutes: BusRoute[] = [
  {
    id: "route-1",
    number: 101,
    name: "Centro - Jardim Ingá",
    description: "Linha que liga o Centro ao bairro Jardim Ingá",
    color: "#4361ee",
    frequency: "A cada 30 minutos",
    nextScheduledTime: "13:30",
    stops: [
      {
        id: "stop-101-1",
        name: "Terminal Central",
        address: "Av. Principal, s/n",
        coordinates: { x: "50%", y: "50%" }
      },
      {
        id: "stop-101-2",
        name: "Praça da República",
        address: "Rua da República, 123",
        coordinates: { x: "40%", y: "40%" }
      },
      {
        id: "stop-101-3",
        name: "Hospital Municipal",
        address: "Av. da Saúde, 500",
        coordinates: { x: "30%", y: "35%" }
      },
      {
        id: "stop-101-4",
        name: "Jardim Ingá",
        address: "Rua das Flores, 55",
        coordinates: { x: "20%", y: "20%" }
      }
    ],
    scheduleTimes: ["06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00"],
    returnScheduleTimes: ["06:15", "06:45", "07:15", "07:45", "08:15", "08:45", "09:15"],
    pathCoordinates: "M 50% 50% L 40% 40% L 30% 35% L 20% 20%"
  },
  {
    id: "route-2",
    number: 102,
    name: "Centro - Setor Leste",
    description: "Linha que conecta o Centro ao Setor Leste",
    color: "#e63946",
    frequency: "A cada 45 minutos",
    nextScheduledTime: "14:15",
    stops: [
      {
        id: "stop-102-1",
        name: "Terminal Central",
        address: "Av. Principal, s/n",
        coordinates: { x: "50%", y: "50%" }
      },
      {
        id: "stop-102-2",
        name: "Mercado Municipal",
        address: "Rua do Comércio, 78",
        coordinates: { x: "60%", y: "45%" }
      },
      {
        id: "stop-102-3",
        name: "Escola Estadual",
        address: "Av. da Educação, 200",
        coordinates: { x: "70%", y: "35%" }
      },
      {
        id: "stop-102-4",
        name: "Setor Leste",
        address: "Rua Leste, 300",
        coordinates: { x: "80%", y: "20%" }
      }
    ],
    scheduleTimes: ["06:15", "07:00", "07:45", "08:30", "09:15", "10:00", "10:45"],
    returnScheduleTimes: ["06:35", "07:20", "08:05", "08:50", "09:35", "10:20", "11:05"],
    pathCoordinates: "M 50% 50% L 60% 45% L 70% 35% L 80% 20%"
  },
  {
    id: "route-3",
    number: 103,
    name: "Centro - Parque Sol",
    description: "Linha que conecta o Centro ao Parque Sol",
    color: "#43aa8b",
    frequency: "A cada 40 minutos",
    nextScheduledTime: "13:40",
    stops: [
      {
        id: "stop-103-1",
        name: "Terminal Central",
        address: "Av. Principal, s/n",
        coordinates: { x: "50%", y: "50%" }
      },
      {
        id: "stop-103-2",
        name: "Shopping Center",
        address: "Av. do Comércio, 1500",
        coordinates: { x: "45%", y: "60%" }
      },
      {
        id: "stop-103-3",
        name: "Faculdade Municipal",
        address: "Rua da Ciência, 400",
        coordinates: { x: "35%", y: "70%" }
      },
      {
        id: "stop-103-4",
        name: "Parque Sol",
        address: "Av. do Sol, 100",
        coordinates: { x: "20%", y: "80%" }
      }
    ],
    scheduleTimes: ["06:20", "07:00", "07:40", "08:20", "09:00", "09:40", "10:20"],
    returnScheduleTimes: ["06:40", "07:20", "08:00", "08:40", "09:20", "10:00", "10:40"],
    pathCoordinates: "M 50% 50% L 45% 60% L 35% 70% L 20% 80%"
  },
  {
    id: "route-4",
    number: 104,
    name: "Centro - Santa Luzia",
    description: "Linha que conecta o Centro ao bairro Santa Luzia",
    color: "#f9c74f",
    frequency: "A cada 50 minutos",
    nextScheduledTime: "14:50",
    stops: [
      {
        id: "stop-104-1",
        name: "Terminal Central",
        address: "Av. Principal, s/n",
        coordinates: { x: "50%", y: "50%" }
      },
      {
        id: "stop-104-2",
        name: "Praça da Liberdade",
        address: "Rua da Liberdade, 50",
        coordinates: { x: "60%", y: "60%" }
      },
      {
        id: "stop-104-3",
        name: "Posto de Saúde",
        address: "Rua da Saúde, 100",
        coordinates: { x: "70%", y: "70%" }
      },
      {
        id: "stop-104-4",
        name: "Santa Luzia",
        address: "Rua Santa Luzia, 200",
        coordinates: { x: "80%", y: "80%" }
      }
    ],
    scheduleTimes: ["06:10", "07:00", "07:50", "08:40", "09:30", "10:20", "11:10"],
    returnScheduleTimes: ["06:35", "07:25", "08:15", "09:05", "09:55", "10:45", "11:35"],
    pathCoordinates: "M 50% 50% L 60% 60% L 70% 70% L 80% 80%"
  },
  {
    id: "route-5",
    number: 105,
    name: "Circular",
    description: "Linha circular que passa pelos principais pontos da cidade",
    color: "#9381ff",
    frequency: "A cada 35 minutos",
    nextScheduledTime: "13:35",
    stops: [
      {
        id: "stop-105-1",
        name: "Terminal Central",
        address: "Av. Principal, s/n",
        coordinates: { x: "50%", y: "50%" }
      },
      {
        id: "stop-105-2",
        name: "Prefeitura",
        address: "Rua da Prefeitura, 10",
        coordinates: { x: "60%", y: "40%" }
      },
      {
        id: "stop-105-3",
        name: "Parque Municipal",
        address: "Av. do Parque, 300",
        coordinates: { x: "40%", y: "30%" }
      },
      {
        id: "stop-105-4",
        name: "Centro Comercial",
        address: "Rua do Comércio, 500",
        coordinates: { x: "30%", y: "60%" }
      },
      {
        id: "stop-105-5",
        name: "Terminal Central",
        address: "Av. Principal, s/n",
        coordinates: { x: "50%", y: "50%" }
      }
    ],
    scheduleTimes: ["06:00", "06:35", "07:10", "07:45", "08:20", "08:55", "09:30"],
    returnScheduleTimes: ["06:00", "06:35", "07:10", "07:45", "08:20", "08:55", "09:30"],
    pathCoordinates: "M 50% 50% L 60% 40% L 40% 30% L 30% 60% Z"
  }
];

// Sample data for recent bus updates
export const recentUpdates: BusUpdate[] = [
  {
    id: "update-1",
    routeId: "route-1",
    time: "12:45",
    status: "Em movimento normal",
    coordinates: { x: "35%", y: "35%" },
    hasIssue: false
  },
  {
    id: "update-2",
    routeId: "route-2",
    time: "12:50",
    status: "Em movimento normal",
    coordinates: { x: "65%", y: "40%" },
    hasIssue: false
  },
  {
    id: "update-3",
    routeId: "route-3",
    time: "12:30",
    status: "Atrasado em 10 minutos",
    coordinates: { x: "40%", y: "65%" },
    hasIssue: true
  },
  {
    id: "update-4",
    routeId: "route-4",
    time: "12:55",
    status: "Em movimento normal",
    coordinates: { x: "65%", y: "65%" },
    hasIssue: false
  },
  {
    id: "update-5",
    routeId: "route-5",
    time: "12:40",
    status: "Em movimento normal",
    coordinates: { x: "45%", y: "40%" },
    hasIssue: false
  }
];
