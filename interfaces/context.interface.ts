import React from "react";
import { CatModel } from "./cat-api.interface";

export interface PussyInterface {
  cats: CatModel[];
  favorites: CatModel[];
  loading: boolean;
  refresh: (cat: CatModel) => void;
}

export const PussyContext = React.createContext<PussyInterface>({
  cats: [],
  favorites: [],
  loading: false,
  refresh: () => {},
});
