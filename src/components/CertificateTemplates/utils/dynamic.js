import dynamic from "next/dynamic";
import LoadingView from "../LoadingView";

export const dynamicWithLoading = template =>
  dynamic(template, { loading: LoadingView });

export const mockDynamicWithLoading = () => LoadingView;

// Export mockDynamicWithLoading to see loading page
export default dynamicWithLoading;
