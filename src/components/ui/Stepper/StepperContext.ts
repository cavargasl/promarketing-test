import { createContext, useContext } from "react"


export interface StepperContextType {
  activeStep: number
  setActiveStep: (step: number) => void
}

const StepperContext = createContext<StepperContextType>({activeStep: 0, setActiveStep: () => {}})

export function useStepperContext(): StepperContextType {
  return useContext(StepperContext)
}

export default StepperContext