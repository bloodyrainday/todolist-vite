import { AppDispatch } from "@/features/todolists/state/store";
import { useDispatch } from "react-redux";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
