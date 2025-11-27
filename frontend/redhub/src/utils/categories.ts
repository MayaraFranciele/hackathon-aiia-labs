import {
  ShoppingCart,
  Car,
  Home,
  Utensils,
  Heart,
  Gamepad2,
  GraduationCap,
  Plane,
  Gift,
  Zap,
} from "lucide-react";

export const categories = {
  shopping: {
    icon: ShoppingCart,
    label: "Compras",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  transport: {
    icon: Car,
    label: "Transporte",
    color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  },
  housing: {
    icon: Home,
    label: "Moradia",
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  },
  food: {
    icon: Utensils,
    label: "Alimentação",
    color: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  },
  health: {
    icon: Heart,
    label: "Saúde",
    color: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
  },
  entertainment: {
    icon: Gamepad2,
    label: "Entretenimento",
    color: "bg-green-500/10 text-green-600 dark:text-green-400",
  },
  education: {
    icon: GraduationCap,
    label: "Educação",
    color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  },
  travel: {
    icon: Plane,
    label: "Viagens",
    color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
  },
  gifts: {
    icon: Gift,
    label: "Presentes",
    color: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  },
  utilities: {
    icon: Zap,
    label: "Utilidades",
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
};

export type CategoryKey = keyof typeof categories;
