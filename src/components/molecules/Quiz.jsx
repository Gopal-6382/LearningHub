// src/components/molecules/Quiz.jsx

const Quiz = ({
  question,
  options,
  selectedAnswer,
  onSelect,
  onSubmit,
  isLast,
}) => {
  return (
    <div className="flex flex-col space-y-6">
      {/* Question */}
      <h3 className="text-xl font-semibold text-gray-800">{question}</h3>

      {/* Options */}
      <div className="flex flex-col space-y-3">
        {options.map((opt, index) => (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className={`w-full text-left px-4 py-3 rounded-lg border transition 
              ${
                selectedAnswer === index
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* Submit Button */}
      <button
        onClick={onSubmit}
        disabled={selectedAnswer === null}
        className={`px-6 py-3 rounded-lg font-medium text-white transition 
          ${
            selectedAnswer === null
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
      >
        {isLast ? "Finish Quiz" : "Next Question"}
      </button>
    </div>
  );
};

export default Quiz;
