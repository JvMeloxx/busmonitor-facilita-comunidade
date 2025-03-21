
import { BusRoute } from "../../types/busTypes";
import { terminalLuziania } from "../terminals";

// CT Expresso routes: 017-022
export const ctExpressoRoutes017to022: BusRoute[] = [
  {
    id: "luziania-w3-norte-setor-grafico",
    number: "017",
    name: "LUZIÂNIA / W3 NORTE SETOR GRÁFICO",
    description: "LUZIÂNIA/W3 NORTE SETOR GRÁFICO",
    color: "#eab308", // Yellow for CT Expresso
    frequency: "Horários programados conforme tabela",
    company: "ctExpresso",
    terminal: terminalLuziania,
    stops: [
      {
        id: "stop-017-1",
        name: "Luziânia Shopping",
        address: "Luziânia Shopping, Luziânia - GO",
        coordinates: { x: "50%", y: "50%" }
      },
      {
        id: "stop-017-2",
        name: "W3 Norte",
        address: "W3 Norte, Brasília - DF",
        coordinates: { x: "70%", y: "25%" }
      },
      {
        id: "stop-017-3",
        name: "Setor Gráfico",
        address: "Setor Gráfico, Brasília - DF",
        coordinates: { x: "72%", y: "23%" }
      }
    ],
    schedule: {
      mondayToFriday: {
        morning: ["05:20"],
        afternoon: [],
        evening: []
      },
      saturdayAndHoliday: {
        morning: [],
        afternoon: [],
        evening: []
      },
      sunday: {
        morning: [],
        afternoon: [],
        evening: []
      }
    },
    nextScheduledTime: "05:20",
    pathCoordinates: "M 50% 50% L 70% 25% L 72% 23%"
  },
  {
    id: "estrela-dalva-2-w3-norte",
    number: "018",
    name: "PARQUE ESTRELA DALVA 2, 4, 8 E 5 / W3 NORTE",
    description: "PARQUE ESTRELA DALVA 2, 4, 8 E 5 (AV. ALFREDO NASSER) / W3 NORTE (BR-040 - PARK SHOPPING - SPS - EIXO)",
    color: "#eab308", // Yellow for CT Expresso
    frequency: "Horários programados conforme tabela",
    company: "ctExpresso",
    terminal: terminalLuziania,
    stops: [
      {
        id: "stop-018-1",
        name: "Parque Estrela Dalva 2, 4, 8 e 5",
        address: "Parque Estrela Dalva, Luziânia - GO",
        coordinates: { x: "45%", y: "55%" }
      },
      {
        id: "stop-018-2",
        name: "W3 Norte",
        address: "W3 Norte, Brasília - DF",
        coordinates: { x: "70%", y: "25%" }
      }
    ],
    schedule: {
      mondayToFriday: {
        morning: ["05:25"],
        afternoon: ["17:00"],
        evening: []
      },
      saturdayAndHoliday: {
        morning: [],
        afternoon: [],
        evening: []
      },
      sunday: {
        morning: [],
        afternoon: [],
        evening: []
      }
    },
    nextScheduledTime: "05:25",
    pathCoordinates: "M 45% 55% L 70% 25%"
  },
  {
    id: "estrela-dalva-2-rodoviaria-pp",
    number: "019",
    name: "PARQUE ESTRELA DALVA 2, 4, 8 E 5 / RODOVIÁRIA DO PLANO PILOTO",
    description: "PARQUE ESTRELA DALVA II - IV - VIII - V (AV. ALFREDO NASSER) / RODOVIÁRIA DO PLANO PILOTO (BR-040 - PARK SHOPPING - SPS - ZOOLÓGICO - EIXO)",
    color: "#eab308", // Yellow for CT Expresso
    frequency: "Horários programados conforme tabela",
    company: "ctExpresso",
    terminal: terminalLuziania,
    stops: [
      {
        id: "stop-019-1",
        name: "Parque Estrela Dalva 2, 4, 8 e 5",
        address: "Parque Estrela Dalva, Luziânia - GO",
        coordinates: { x: "45%", y: "55%" }
      },
      {
        id: "stop-019-2",
        name: "Rodoviária do Plano Piloto",
        address: "Rodoviária do Plano Piloto, Brasília - DF",
        coordinates: { x: "70%", y: "25%" }
      }
    ],
    schedule: {
      mondayToFriday: {
        morning: ["04:55"],
        afternoon: ["16:45", "17:25"],
        evening: ["19:30"]
      },
      saturdayAndHoliday: {
        morning: [],
        afternoon: [],
        evening: []
      },
      sunday: {
        morning: [],
        afternoon: [],
        evening: []
      }
    },
    nextScheduledTime: "04:55",
    pathCoordinates: "M 45% 55% L 70% 25%"
  },
  {
    id: "luziania-brt-santa-maria",
    number: "020",
    name: "LUZIÂNIA / BRT SANTA MARIA",
    description: "ROD. LUZIANIA/GO - BRT SANTA MARIA VIA BR 040",
    color: "#eab308", // Yellow for CT Expresso
    frequency: "Horários programados conforme tabela",
    company: "ctExpresso",
    terminal: terminalLuziania,
    stops: [
      {
        id: "stop-020-1",
        name: "Rodoviária de Luziânia",
        address: "Rodoviária de Luziânia, Luziânia - GO",
        coordinates: { x: "50%", y: "50%" }
      },
      {
        id: "stop-020-2",
        name: "BR-040",
        address: "BR-040, DF",
        coordinates: { x: "58%", y: "45%" }
      },
      {
        id: "stop-020-3",
        name: "BRT Santa Maria",
        address: "BRT Santa Maria, Santa Maria - DF",
        coordinates: { x: "65%", y: "40%" }
      }
    ],
    schedule: {
      mondayToFriday: {
        morning: ["05:00", "05:40", "06:00", "06:40", "07:50"],
        afternoon: ["15:30", "17:00", "17:30"],
        evening: []
      },
      saturdayAndHoliday: {
        morning: [],
        afternoon: [],
        evening: []
      },
      sunday: {
        morning: [],
        afternoon: [],
        evening: []
      }
    },
    nextScheduledTime: "05:00",
    pathCoordinates: "M 50% 50% L 58% 45% L 65% 40%"
  },
  {
    id: "luziania-polo-jk-santa-maria-single",
    number: "021",
    name: "LUZIÂNIA / POLO JK SANTA MARIA (Horário Único)",
    description: "ROD. LUZIÂNIA/GO - POLO JK SANTA MARIA VIA BR 040",
    color: "#eab308", // Yellow for CT Expresso
    frequency: "Horários programados conforme tabela",
    company: "ctExpresso",
    terminal: terminalLuziania,
    stops: [
      {
        id: "stop-021-1",
        name: "Rodoviária de Luziânia",
        address: "Rodoviária de Luziânia, Luziânia - GO",
        coordinates: { x: "50%", y: "50%" }
      },
      {
        id: "stop-021-2",
        name: "BR-040",
        address: "BR-040, DF",
        coordinates: { x: "58%", y: "45%" }
      },
      {
        id: "stop-021-3",
        name: "Polo JK",
        address: "Polo JK, Santa Maria - DF",
        coordinates: { x: "63%", y: "42%" }
      }
    ],
    schedule: {
      mondayToFriday: {
        morning: ["07:00"],
        afternoon: [],
        evening: []
      },
      saturdayAndHoliday: {
        morning: [],
        afternoon: [],
        evening: []
      },
      sunday: {
        morning: [],
        afternoon: [],
        evening: []
      }
    },
    nextScheduledTime: "07:00",
    pathCoordinates: "M 50% 50% L 58% 45% L 63% 42%"
  },
  {
    id: "luziania-polo-jk-santa-maria",
    number: "022",
    name: "LUZIÂNIA / POLO JK SANTA MARIA",
    description: "ROD. LUZIÂNIA/GO - POLO JK SANTA MARIA VIA BR 040",
    color: "#eab308", // Yellow for CT Expresso
    frequency: "Horários programados conforme tabela",
    company: "ctExpresso",
    terminal: terminalLuziania,
    stops: [
      {
        id: "stop-022-1",
        name: "Rodoviária de Luziânia",
        address: "Rodoviária de Luziânia, Luziânia - GO",
        coordinates: { x: "50%", y: "50%" }
      },
      {
        id: "stop-022-2",
        name: "BR-040",
        address: "BR-040, DF",
        coordinates: { x: "58%", y: "45%" }
      },
      {
        id: "stop-022-3",
        name: "Polo JK",
        address: "Polo JK, Santa Maria - DF",
        coordinates: { x: "63%", y: "42%" }
      }
    ],
    schedule: {
      mondayToFriday: {
        morning: ["04:20", "04:30", "05:00", "05:10", "05:10", "05:30", "05:40", "05:50", "05:50", "06:10", "06:20", "06:20", "06:30", "06:30", "06:55", "07:10", "07:30", "07:40", "07:50", "08:20", "08:30", "08:30", "09:20", "09:20", "09:50", "10:30", "10:30", "10:50", "11:10", "11:20", "11:50"],
        afternoon: ["12:30", "12:40", "12:40", "13:20", "13:20", "14:00", "14:25", "15:15", "15:45", "15:50", "16:00", "16:10", "16:30", "16:30", "16:40", "16:50", "17:00", "17:15", "17:30", "17:30", "17:35", "18:00", "18:10", "18:30", "18:40", "19:35"],
        evening: []
      },
      saturdayAndHoliday: {
        morning: [],
        afternoon: [],
        evening: []
      },
      sunday: {
        morning: [],
        afternoon: [],
        evening: []
      }
    },
    nextScheduledTime: "04:20",
    pathCoordinates: "M 50% 50% L 58% 45% L 63% 42%"
  }
];
