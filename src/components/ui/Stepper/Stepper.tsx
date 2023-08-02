import { cn } from "@/lib/utils"
import React, { cloneElement, forwardRef, useContext, useEffect, useMemo, type ReactElement } from "react"
import { StepConnector, connectorClassNameCompleteDefault, connectorClassNameDefault } from "./StepConnector"
import StepperContext from "./StepperContext"

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactElement[]
  activeStep: number
  isLastStep: (value: boolean) => void
  isFirstStep: (value: boolean) => void
  connector?: ReactElement
  setActiveStep: (value: number) => void
}
const Stepper = forwardRef<
  HTMLDivElement,
  StepperProps
>(({ className, isLastStep, isFirstStep, activeStep, connector, setActiveStep, ...props }, ref) => {
  const { children } = props

  const childrenArray = React.Children.toArray(children).filter(Boolean)
  const steps = childrenArray.map((step, index) => {
    return cloneElement(step as React.ReactElement, {
      index,
    })
  })

  useEffect(() => {
    isLastStep(activeStep === props.children.length - 1)
    isFirstStep(activeStep === 0)
  }, [activeStep, isLastStep, isFirstStep, props.children.length])

  const contextValue = useMemo(
    () => ({ activeStep, setActiveStep }),
    [activeStep, setActiveStep]
  )

  const dynamicWidth = useMemo(() => {
    function getWidth() {
      if (activeStep === 0) return "0%"
      if (activeStep === steps.length - 1) return "calc(100% - 4px)"
      const width = `${((activeStep / (steps.length - 1)) * 100).toFixed(2)}%`
      return width
    }
    return getWidth()
  }, [activeStep, steps.length])

  const memoizedConnectorDefault = useMemo(() => {
    if (!connector) return <StepConnector />
    const connectorProps = connector.props as { className?: string }
    const hasClassName = "className" in connectorProps
    const connectorClassName = hasClassName ? connectorProps.className : ""
    return cloneElement(connector, {
      className: cn(connectorClassNameDefault, connectorClassName),
      completedClassName: undefined,
    })
  }, [connector])

  const memoizedConnectorComplete = useMemo(() => {
    if (!connector) return <StepConnector style={{width: dynamicWidth}} completedClassName={connectorClassNameCompleteDefault} />
    const connectorProps = connector.props as { completedClassName?: string }
    const hasCompletedClassName = "completedClassName" in connectorProps
    const connectorCompleteClassName = hasCompletedClassName ? connectorProps.completedClassName : ""
    return cloneElement(connector, {
      className: cn(connectorClassNameCompleteDefault, connectorCompleteClassName),
      style: {width: dynamicWidth}
    })
  }, [connector, dynamicWidth])

  return (
    <StepperContext.Provider value={contextValue}>
      <div
        ref={ref}
        className={cn("relative flex w-full items-center justify-between gap-1", className)}
        {...props}
      >
        {memoizedConnectorDefault}
        {memoizedConnectorComplete}
        {steps}
      </div>
    </StepperContext.Provider>
  )
})
Stepper.displayName = "Stepper"


interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  index?: number
  activeClassName?: string
  completedClassName?: string
  StepIconComponent?: React.ReactNode
  children?: React.ReactElement<StepContentProps>
}
const Step = forwardRef<
  HTMLDivElement,
  StepProps
>(({ className, StepIconComponent, index, activeClassName, completedClassName, ...props }, ref) => {
  const { children } = props
  const { activeStep, setActiveStep } = useContext(StepperContext)
  if (index === undefined) return null

  const stepContent = children && cloneElement(children, {
    index,
  })

  if (!StepIconComponent) return (
    <div
      onClick={() => setActiveStep(index)}
      className={cn("relative h-4 w-4 cursor-pointer rounded-full bg-neutral transition-colors duration-500",
        className,
        index === activeStep && `${activeClassName ? activeClassName : "border border-success bg-success-foreground text-success"}`,
        (index < activeStep) && `${completedClassName ? completedClassName : "bg-success text-background"}`)}
    >
      {stepContent}
    </div>
  )

  return (
    <div className="relative">
      <div
        onClick={() => setActiveStep(index)}
        ref={ref}
        className={cn("flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-neutral text-neutral-foreground", className,
          index === activeStep && `${activeClassName ? activeClassName : "border border-success bg-success-foreground text-success"}`,
          (index < activeStep) && `${completedClassName ? completedClassName : "bg-success text-background"}`
        )}
        {...props}
      >
        {StepIconComponent}
      </div>
      {stepContent}
    </div>
  )
})
Step.displayName = "Step"


interface StepContentProps extends React.HTMLAttributes<HTMLDivElement> {
  index?: number
  activeClassName?: string
  completedClassName?: string
}
const StepContent = forwardRef<
  HTMLDivElement,
  StepContentProps
>(({ className, index, activeClassName, completedClassName, ...props }, ref) => {
  const { activeStep } = useContext(StepperContext)
  if (index === undefined) return null
  return (
    <div
      ref={ref}
      className={cn("absolute left-[50%] top-[calc(100%+1rem)] flex w-max -translate-x-2/4 flex-col items-center justify-center gap-1 text-neutral-foreground", className,
        index === activeStep && `${activeClassName ? activeClassName : "text-success"}`,
        (index < activeStep) && `${completedClassName ? completedClassName : "text-success"}`
      )}
      {...props}
    >
      {props.children}
    </div>
  )
})
StepContent.displayName = "StepContent"

export { Step, StepContent, Stepper }

