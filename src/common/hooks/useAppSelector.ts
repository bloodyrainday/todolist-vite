import { AppRootState } from "../../state/store";
import { useSelector } from "react-redux";

export const useAppSelector = useSelector.withTypes<AppRootState>();
