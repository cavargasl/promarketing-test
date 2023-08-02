import { cn } from "@/lib/utils"
import { forwardRef } from "react"

const connectorClassNameDefault = "absolute h-[2px] w-[calc(100%-4px)] left-[2px] bg-neutral"
const connectorClassNameCompleteDefault = "absolute h-[2px] left-[2px] bg-success"

interface StepConnectorProps extends React.HTMLAttributes<HTMLDivElement> {
  completedClassName?: string
}
const StepConnector = forwardRef<
  HTMLDivElement,
  StepConnectorProps
>(({ className, completedClassName, ...props }, ref) => {
  return <div className={cn(connectorClassNameDefault, completedClassName, className)} ref={ref} {...props} />
})
StepConnector.displayName = "StepConnector"

export { StepConnector, connectorClassNameDefault, connectorClassNameCompleteDefault }