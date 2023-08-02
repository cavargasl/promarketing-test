import { createContext, useContext } from "react"


export interface StepperContextType {
  activeStep: number
}

const StepperContext = createContext<StepperContextType>({activeStep: 0})

export function useStepperContext(): StepperContextType {
  return useContext(StepperContext)
}

export default StepperContext