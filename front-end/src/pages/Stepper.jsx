import { useNavigate, useLocation } from "react-router-dom";

const Stepper = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const steps = [
    { label: "Cart", path: "/cart" },
    { label: "Checkout", path: "/checkout" },
    { label: "Order Placed", path: "/order-placed" },
  ];

  // current step ka index
  const currentStep = steps.findIndex((s) => s.path === location.pathname);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "40px",
      }}
    >
      {steps.map((step, idx) => {
        const isActive = idx === currentStep;
        const isClickable = idx < currentStep; // sirf previous steps clickable

        return (
          <div
            key={idx}
            onClick={() => isClickable && navigate(step.path)} // ✅ sirf previous steps clickable
            style={{
              display: "flex",
              alignItems: "center",
              fontWeight: isActive ? "bold" : "normal",
              color: isActive ? "#000000ff" : "#666",
              cursor: isClickable ? "pointer" : "default", // pointer only for allowed
            }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: idx <= currentStep ? "#ff4081" : "#ccc",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 8,
                fontSize: 14,
              }}
            >
              {idx + 1}
            </div>
            {step.label}
            {idx < steps.length - 1 && (
              <div
                style={{
                  width: 50,
                  height: 2,
                  background: "#ddd",
                  margin: "0 15px",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
