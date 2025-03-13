import { AppRootState } from "@/features/todolists/state/store";
import { useSelector } from "react-redux";

export const useAppSelector = useSelector.withTypes<AppRootState>();
