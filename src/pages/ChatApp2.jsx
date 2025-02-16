import { useState, useEffect, useRef } from "react";
import '../styles/chat-styles.css'
import { ChatMessage } from "./ChatMessage";
import { TypingIndicator } from "./TypingIndicator";
import { Grid2 } from "@mui/material";

const messages = [
  {
    id: "initial-1",
    content: "Hey there! 👋 Need help with bills?",
    role: "assistant",
    delay: 600,
  },
  {
    id: "initial-2",
    content:
      "I'm Emily, your virtual assistant, and I've got great news about a special health plan that could save you serious cash! 💰",
    role: "assistant",
    delay: 800,
  },
  {
    id: "initial-3",
    content:
      "Want to see if you qualify for a $0 health plan AND a $500 rewards card for groceries and gas? It only takes 2 minutes! Tap 'Yes' to get started! 🚀",
    role: "assistant",
    delay: 1000,
  },
];

const fullGrid = { lg: 12, md: 12, sm: 12, xs: 12 };
const halfGrid = { lg: 6, md: 6, sm: 6, xs: 6 };

export const medicaidOptions = {
  creditCardDebt: [
    { id: "m_o_1_1", value: "yes", label: "Yes", goToStep: 2, gridValues: halfGrid },
    { id: "m_o_1_2", value: "no", label: "No", goToStep: 3, gridValues: halfGrid },
  ],
  debtRange: [
    { id: "m_o_2_1", value: "over", label: "Over $15,000", goToStep: 4, gridValues: halfGrid },
    { id: "m_o_2_2", value: "under", label: "Under $15,000", goToStep: 5, gridValues: halfGrid },
  ],
  personalLoan: [
    { id: "m_o_3_1", value: "yes", label: "Yes", goToStep: 6, gridValues: halfGrid },
    { id: "m_o_3_2", value: "no", label: "No", goToStep: 7, gridValues: halfGrid },
  ],
  debtSpecificRange: [
    { id: "m_o_4_1", value: "15-20k", label: "15-20k", goToStep: 8, gridValues: fullGrid },
    { id: "m_o_4_2", value: "20-25k", label: "20-25k", goToStep: 8, gridValues: fullGrid },
    { id: "m_o_4_3", value: "30k+", label: "30k+", goToStep: 8, gridValues: fullGrid },
  ],
  loanAmount: [
    { id: "m_o_6_1", label: "$100-1700", goToStep: 14, gridValues: fullGrid },
    { id: "m_o_6_2", label: "$1700-3300", goToStep: 14, gridValues: fullGrid },
    { id: "m_o_6_2", label: "$3300-4900", goToStep: 14, gridValues: fullGrid },
    { id: "m_o_6_2", label: "$4900-6500", goToStep: 14, gridValues: fullGrid },
    { id: "m_o_6_2", label: "$6500-8100", goToStep: 14, gridValues: fullGrid },
    { id: "m_o_6_2", label: "$8100-10000", goToStep: 14, gridValues: fullGrid },
  ],
  creditScore: [
    { id: "m_o_7_1", label: "Excellent (700+)", goToStep: 8, gridValues: fullGrid },
    { id: "m_o_7_2", label: "Good (650-700)", goToStep: 8, gridValues: fullGrid },
    { id: "m_o_7_3", label: "Fair (550-650)", goToStep: 8, gridValues: fullGrid },
    { id: "m_o_7_4", label: "Poor (550 or lower)", goToStep: 8, gridValues: fullGrid },
    { id: "m_o_7_5", label: "No credit", goToStep: 8, gridValues: fullGrid },
  ],
  nameInput: [{ id: "m_o_8_1", type: "input", goToStep: 9, label: "Type your response here", gridValues: fullGrid, fieldType: "name" }],
  emailInput: [{ id: "m_o_8_1", type: "input", goToStep: 10, label: "Type your response here", gridValues: fullGrid, fieldType: "email" }],
  phoneInput: [{ id: "m_o_8_1", type: "input", goToStep: 11, label: "Type your response here", gridValues: fullGrid, fieldType: "phone" }],
  zipInput: [{ id: "m_o_8_1", type: "input", goToStep: 15, label: "Type your response here", gridValues: fullGrid, fieldType: "zip_code" }],
};

export const medicaidFlow = {
  1: {
    assistant_messages: [
      "I see you're on Medicaid. While you may not qualify for the ACA benefits, we might have other options that could help you.",
      "Are you currently in credit card debt?"
    ],
    options: medicaidOptions.creditCardDebt,
  },
  2: {
    assistant_messages: ["I understand. Is your credit card debt over or under $15,000?"],
    options: medicaidOptions.debtRange,
  },
  3: {
    assistant_messages: ["Alright, thanks for letting me know. Are you looking for a personal loan? You can get qualified independent of your credit score!"],
    options: medicaidOptions.personalLoan,
  },
  4: {
    assistant_messages: ["I see. Could you please specify the range of your debt?"],
    options: medicaidOptions.debtSpecificRange,
  },
  5: {
    assistant_messages: ["Thank you for sharing that. Are you looking for a personal loan? You can get qualified independent of your credit score!"],
    options: medicaidOptions.personalLoan,
  },
  6: {
    assistant_messages: ["Great! How much would you like to borrow?"],
    options: medicaidOptions.loanAmount,
  },
  7: {
    assistant_messages: ["I understand. Thank you for your time. If you need any assistance in the future, please don't hesitate to reach out!."],
  },
  8: {
    assistant_messages: [
      "Thank you for providing that information. Now, let's collect some details so we can help you further.",
    ],
  },
  9: {
    assistant_messages: [
      "What's your email?"
    ],
    options: medicaidOptions.emailInput,
  },
  10: {
    assistant_messages: [
      "What's your phone number?"
    ],
    options: medicaidOptions.phoneInput,
  },
  11: {
    assistant_messages: [
      "What's your zip code?"
    ],
    options: medicaidOptions.zipInput,
  },
  12: {
    assistant_messages: [
      "Thank you for providing that information. We'll be in touch shortly."
    ],
  },
  13: {
    assistant_messages: [
      "I understand. Thank you for your time. If you need any assistance in the future, please don't hesitate to reach out!."
    ],
  },
  14: {
    assistant_messages: [
      "Thank you. What's your credit score range?"
    ],
    options: medicaidOptions.creditScore,
  },
  15: {
    assistant_messages: [
      "Thank you for providing your information. An agent will be in touch with you shortly!"
    ],
  }
};

export const medicareOptions = {
  creditCardDebt: [
    { id: "m_o_1_1", value: "yes", label: "Yes", goToStep: 2, gridValues: halfGrid },
    { id: "m_o_1_2", value: "no", label: "No", goToStep: 3, gridValues: halfGrid },
  ],
  debtRange: [
    { id: "m_o_2_1", value: "over", label: "Over $15,000", goToStep: 4, gridValues: halfGrid },
    { id: "m_o_2_2", value: "under", label: "Under $15,000", goToStep: 5, gridValues: halfGrid },
  ],
  personalLoan: [
    { id: "m_o_3_1", value: "yes", label: "Yes", goToStep: 6, gridValues: halfGrid },
    { id: "m_o_3_2", value: "no", label: "No", goToStep: 7, gridValues: halfGrid },
  ],
  debtSpecificRange: [
    { id: "m_o_4_1", value: "15-20k", label: "15-20k", goToStep: 8, gridValues: fullGrid },
    { id: "m_o_4_2", value: "20-25k", label: "20-25k", goToStep: 8, gridValues: fullGrid },
    { id: "m_o_4_3", value: "30k+", label: "30k+", goToStep: 8, gridValues: fullGrid },
  ],
  loanAmount: [
    { id: "m_o_6_1", label: "$100-1700", goToStep: 14, gridValues: fullGrid },
    { id: "m_o_6_2", label: "$1700-3300", goToStep: 14, gridValues: fullGrid },
    { id: "m_o_6_2", label: "$3300-4900", goToStep: 14, gridValues: fullGrid },
    { id: "m_o_6_2", label: "$4900-6500", goToStep: 14, gridValues: fullGrid },
    { id: "m_o_6_2", label: "$6500-8100", goToStep: 14, gridValues: fullGrid },
    { id: "m_o_6_2", label: "$8100-10000", goToStep: 14, gridValues: fullGrid },
  ],
  creditScore: [
    { id: "m_o_7_1", label: "Excellent (700+)", goToStep: 8, gridValues: fullGrid },
    { id: "m_o_7_2", label: "Good (650-700)", goToStep: 8, gridValues: fullGrid },
    { id: "m_o_7_3", label: "Fair (550-650)", goToStep: 8, gridValues: fullGrid },
    { id: "m_o_7_4", label: "Poor (550 or lower)", goToStep: 8, gridValues: fullGrid },
    { id: "m_o_7_5", label: "No credit", goToStep: 8, gridValues: fullGrid },
  ],
  nameInput: [{ id: "m_o_8_1", type: "input", goToStep: 9, label: "Type your response here", gridValues: fullGrid, fieldType: "name" }],
  emailInput: [{ id: "m_o_8_1", type: "input", goToStep: 11, label: "Type your response here", gridValues: fullGrid, fieldType: "email" }],
  zipInput: [{ id: "m_o_8_1", type: "input", goToStep: 10, label: "Type your response here", gridValues: fullGrid, fieldType: "zip_code" }],
  phoneInput: [{ id: "m_o_8_1", type: "input", goToStep: 15, label: "Type your response here", gridValues: fullGrid, fieldType: "phone" }],
};

export const medicareFlow = {
  1: {
    assistant_messages: [
      "I see you're on Medicaid. While you may not qualify for the ACA benefits, we might have other options that could help you.",
      "Are you currently in credit card debt?"
    ],
    options: medicareOptions.creditCardDebt,
  },
  2: {
    assistant_messages: ["I understand. Is your credit card debt over or under $15,000?"],
    options: medicareOptions.debtRange,
  },
  3: {
    assistant_messages: ["Alright, thanks for letting me know. Are you looking for a personal loan? You can get qualified independent of your credit score!"],
    options: medicareOptions.personalLoan,
  },
  4: {
    assistant_messages: ["I see. Could you please specify the range of your debt?"],
    options: medicareOptions.debtSpecificRange,
  },
  5: {
    assistant_messages: ["Thank you for sharing that. Are you looking for a personal loan? You can get qualified independent of your credit score!"],
    options: medicareOptions.personalLoan,
  },
  6: {
    assistant_messages: ["Great! How much would you like to borrow?"],
    options: medicareOptions.loanAmount,
  },
  7: {
    assistant_messages: ["I understand. Thank you for your time. If you need any assistance in the future, please don't hesitate to reach out!."],
  },
  8: {
    assistant_messages: [
      "Thank you for providing that information. Now, let's collect some details so we can help you further.",
    ],
  },
  9: {
    assistant_messages: [
      "What's your email?"
    ],
    options: medicareOptions.emailInput,
  },
  10: {
    assistant_messages: [
      "What's your phone number?"
    ],
    options: medicareOptions.phoneInput,
  },
  11: {
    assistant_messages: [
      "What's your zip code?"
    ],
    options: medicareOptions.zipInput,
  },
  12: {
    assistant_messages: [
      "Thank you for providing that information. We'll be in touch shortly."
    ],
  },
  13: {
    assistant_messages: [
      "I understand. Thank you for your time. If you need any assistance in the future, please don't hesitate to reach out!."
    ],
  },
  14: {
    assistant_messages: [
      "Thank you. What's your credit score range?"
    ],
    options: medicareOptions.creditScore,
  },
  15: {
    assistant_messages: [
      "Thank you for providing your information. An agent will be in touch with you shortly!"
    ],
  }
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const appendMessagesWithDelay = async (updateChat, messages, delayMs) => {
  for (const message of messages) {
    const messageObj = { id: "assistant-6", content: message, role: "assistant" }
    await delay(delayMs);
    updateChat((prev) => [...prev || [], messageObj]);
  }
};

export default function ChatApp() {
  const buttonsRef = useRef(null)
  const chatContainerRef = useRef(null)

  const [chat, setChat] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showFinalOptions, setShowFinalOptions] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const [mediacaidStep, setMedicaidStep] = useState(1);
  const [medicaidOptions, setMedicaidOptions] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formStep, setFormStep] = useState(0);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    zip_code: "",
  })

  useEffect(() => {
    let timeoutIds = [];
    setIsTyping(true);
    messages.forEach((msg, index) => {
      const timeoutId = setTimeout(() => {
        setChat((prev) => [...prev, msg]);
        setVisibleMessages(messages.length - 1);
        if (index === messages.length - 1) {
          setShowButton(true);
          setIsTyping(false);
        }
      }, messages.slice(0, index + 1).reduce((acc, m) => acc + m.delay, 0));

      timeoutIds.push(timeoutId);
    });

    return () => timeoutIds.forEach(clearTimeout);
  }, []);

  const handleClick = () => {
    setShowButton(false);

    setIsTyping(true);
    setChat((prev) => [...prev, { id: "user-1", content: "Yes", role: "user" }]);

    setTimeout(() => {
      setChat((prev) => [...prev, { id: "assistant-4", content: "Great! To see what benefits you qualify for in your area, I'll need to ask you a few quick questions. This will help us provide you with the most accurate information.", role: "assistant" }]);
      setIsTyping(false);
    }, 1000);

    setTimeout(() => {
      setChat((prev) => [...prev, { id: "assistant-5", content: "What's your name?", role: "assistant" }]);
      setVisibleMessages(messages.length - 1);
      setMedicaidOptions(medicareOptions?.nameInput)
    }, 2000);

  };

  const handleMedicaidClick = async () => {

    setShowOptions(false);

    setIsTyping(true);
    setChat((prev) => [...prev, { id: `user-${mediacaidStep}`, content: "Medicaid", role: "user" }]);

    const currentStep = medicaidFlow[mediacaidStep];

    if (currentStep) {
      await appendMessagesWithDelay(setChat, currentStep.assistant_messages, 1);
      setMedicaidStep((prev) => prev + 1);

      const options = currentStep.options;
      setMedicaidOptions(options)
    }

    setIsTyping(false);
  };

  const handleMediCare = async () => {

    setShowOptions(false);

    setIsTyping(true);
    setChat((prev) => [...prev, { id: `user-${medicareFlow}`, content: "Medicare", role: "user" }]);

    const currentStep = medicareFlow[mediacaidStep];

    if (currentStep) {
      await appendMessagesWithDelay(setChat, currentStep.assistant_messages, 1000);
      setMedicaidStep((prev) => prev + 1);

      const options = currentStep.options;
      setMedicaidOptions(options)
    }

    setIsTyping(false);
  };

  const isFirstInGroup = (index) => {
    if (index === 0) return true;
    const currentMessage = chat[index];
    const previousMessage = chat[index - 1];
    return currentMessage.role !== previousMessage.role;
  };

  const isLastInGroup = (index) => {
    if (index === chat.length - 1) return true;
    const currentMessage = chat[index];
    const nextMessage = chat[index + 1];
    return currentMessage.role !== nextMessage.role;
  };

  const handleOptionClick = async (option) => {
    setIsTyping(true);
    setMedicaidOptions(null)
    setChat((prev) => [...prev, { id: `user-${mediacaidStep}`, content: option.label, role: "user" }]);

    const currentStep = medicaidFlow[option.goToStep];

    if (currentStep) {
      await appendMessagesWithDelay(setChat, currentStep.assistant_messages, 1000);
      setMedicaidStep(option.goToStep);

      const options = currentStep.options;
      setMedicaidOptions(options);
    }

    setIsTyping(false);
  };

  const handleInsuranceClick = () => {
    setIsTyping(true);
    setChat((prev) => [...prev, { id: "user-2", content: "None", role: "user" }]);

    setTimeout(() => {
      setChat((prev) => [...prev, { id: "assistant-6", content: "🎉 Fantastic news! You're one step closer to major savings!", role: "assistant" }]);
      setIsTyping(false);
    }, 1000);

    setTimeout(() => {
      setChat((prev) => [...prev, { id: "assistant-7", content: "Based on what you've told me, you might qualify for a $0 health plan AND a $500 spending card for essentials like groceries, gas, and rent. That's real money back in your pocket!", role: "assistant" }]);
    }, 2000);

    setTimeout(() => {
      const newMessages = [{ id: "assistant-8", content: "Don't miss out on this opportunity! Call now to lock in your benefits. It only takes a few minutes, and you could start saving today!", role: "assistant" }];
      setChat((prev) => [...prev, ...newMessages || []]);
      setShowFinalOptions(true);
    }, 3000);

    setShowOptions(false);
  }

  const handleSubmit = (option) => {
    const input = document.querySelector('input[type="text"]')
    const value = input.value.trim()

    if (value === "") {
      return
    }

    const formattedOption = { ...option, label: value }
    if (option.fieldType !== "zip_code") {
      handleOptionClick(formattedOption)
    }

    setForm((prev) => ({ ...prev, [option.fieldType]: value }))

    if (option.fieldType === "zip_code") {
      console.log("DATA SUBMITTED")
      console.log("Name - ", form.name)
      console.log("Email - ", form.email)
      console.log("Phone - ", form.phone)
      console.log("Zip Code - ", value)

      setChat((prev) => [...prev, { id: "user-11", content: value, role: "user" }]);
      setIsTyping(true)
      setTimeout(() => {
        setChat((prev) => [...prev, { id: "assistant-4", content: "Thank you for providing your information. Now, are you currently on Medicaid or Medicare?", role: "assistant" }]);
        setIsTyping(false);
        setMedicaidOptions(null)
        setShowOptions(true)
        setMedicaidStep(1)
      }, 1000);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      if (buttonsRef.current) {
        const scrollOptions = {
          behavior: "smooth",
          block: "center",
        }
        buttonsRef.current.scrollIntoView(scrollOptions)
      }
    }, 100)
  }, [chat]);

  return (
    <div className="chat-container" ref={chatContainerRef}>
      <div className="chat-box">
        {chat.map((message, index) => (
          <ChatMessage
            key={index}
            message={message}
            isFirstInGroup={isFirstInGroup(index)}
            isLastInGroup={isLastInGroup(index)}
            index={index}
            visibleMessages={chat.length - 1}
          />
        ))}
        {isTyping && <TypingIndicator />}
      </div>

      <div className="button-container">
        {showButton && <button className="button1" onClick={handleClick}>Yes, Show Me How to Save!</button>}
        {showOptions && (
          <div className="chat-options" ref={buttonsRef}>
            <button className="chat-button" onClick={handleInsuranceClick}>No Insurance</button>
            <button className="chat-button" onClick={handleMediCare}>Medicare</button>
            <button className="chat-button" onClick={handleMedicaidClick}>Medicaid</button>
          </div>
        )}
        {showFinalOptions && (
          <div className="chat-options" ref={buttonsRef}>
            <div className="chat-notification">
              <p className="chat-notification-message">
                🎉 Great news! You're pre-qualified for amazing benefits!
              </p>
            </div>
            <button className="button1">
              <a href="tel:+18889823536" className="call-button">
                Call (888) 982-3536 Now!
              </a>
            </button>
            {/* <div id="phone-number">
              <a href="tel:+18889823536" className="call-button">
                Call (888) 982-3536 Now!
              </a>
            </div> */}
            <div className="info-text">
              <div>TTY: 711</div>
              <div className="availability">Friendly Agents Available: M-F 9am-6pm EST</div>
            </div>
          </div>
        )}
        {medicaidOptions && (
          <Grid2 container spacing={2} ref={buttonsRef}>
            {medicaidOptions.map((option, index) => (
              <Grid2 item size={{ ...option.gridValues }} key={index}>
                {option.type === "input" ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmit(option);
                    }}
                    style={{ width: '100%', }}
                  >
                    <input
                      type="text"
                      placeholder="Type your response here..."
                      style={{
                        width: '93%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.5rem',
                        outline: 'none',
                        marginBottom: "0.9rem",
                        boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.5)',
                      }}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleSubmit(
                            option)
                        }
                      }}
                    />
                    <button type="submit" className="chat-button">Submit</button>
                  </form>
                ) :
                  <button key={index} className="chat-button" onClick={() => handleOptionClick(option)}>{option.label}</button>
                }
              </Grid2>
            ))}
          </Grid2>
        )}
      </div>
    </div >
  );
}