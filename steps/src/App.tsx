import { ReactElement, useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  let stepsTemplate!: ReactElement;

  const handleNext = () => {
    if (step < 3) {
      setStep((currentStep) => currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep((currentStep) => currentStep - 1);
    }
  }

  const handleToggle = () => {
    setIsOpen((currentIsOpen) => !currentIsOpen);
  }

  if (isOpen) {
    stepsTemplate = (
      <div className="steps">
      <div className="numbers">
        <div className={step >= 1 ? "active" : ""}>1</div>
        <div className={step >= 2 ? "active" : ""}>2</div>
        <div className={step >= 3 ? "active" : ""}>3</div>
      </div>

      <Message step={step}>{messages[step - 1]}</Message>

      {/* <p className="message">
        Step {step}: {messages[step - 1]}
      </p> */}

      <div className="buttons">
        <Button bgColor='#7950f2' color='#fff' handleClick={handlePrevious}>Prev</Button>
        <Button bgColor='#7950f2' color='#fff' handleClick={handleNext}>Next</Button>
      </div>
    </div>
    );
  } else {
    stepsTemplate = <></>;
  }

  return (
    <>
      <button className="close" onClick={handleToggle}>&times;</button>
      {stepsTemplate}
    </>
  )
}

function Button({bgColor, color, handleClick, children}: {bgColor: string, color: string, handleClick: () => void, children: ReactElement | string | number}) {
  return <button style={{backgroundColor: bgColor, color: color}} onClick={handleClick}>{children}</button>
}

function Message({step, children}: {step: number, children: ReactElement | string | number}) {
  return <p className="message"><h3>Step {step}:</h3> {children}</p>
}