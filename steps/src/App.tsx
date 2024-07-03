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

      <p className="message">
        Step {step}: {messages[step - 1]}
      </p>

      <div className="buttons">
        <button style={{backgroundColor: '#7950f2', color: '#fff'}} onClick={handlePrevious}>Previous</button>
        <button style={{backgroundColor: '#7950f2', color: '#fff'}} onClick={handleNext}>Next</button>
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