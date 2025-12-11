import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Sparkles } from 'lucide-react';
import { useVibeStore } from '../store/vibeStore';
import { quizQuestions } from '../data/quizData';

export default function VibeQuiz() {
  const {
    currentQuestion,
    answers,
    quizStarted,
    quizComplete,
    setAnswer,
    nextQuestion,
    prevQuestion,
    completeQuiz
  } = useVibeStore();

  const [localValue, setLocalValue] = useState<string | string[] | number>('');
  const [sliderValue, setSliderValue] = useState(5);
  const [isAnimating, setIsAnimating] = useState(false);

  // Scroll to results when quiz completes
  useEffect(() => {
    if (quizComplete) {
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }, [quizComplete]);

  const question = quizQuestions.find(q => q.id === currentQuestion);
  const currentAnswer = answers.find(a => a.questionId === currentQuestion);
  const progress = (currentQuestion / quizQuestions.length) * 100;

  useEffect(() => {
    if (currentAnswer) {
      setLocalValue(currentAnswer.value);
      if (question?.type === 'slider') {
        setSliderValue(currentAnswer.value as number);
      }
    } else {
      setLocalValue(question?.type === 'multi' ? [] : '');
      setSliderValue(5);
    }
  }, [currentQuestion, currentAnswer, question?.type]);

  const handleNext = () => {
    if (isAnimating) return;
    
    if (localValue !== '' && localValue !== undefined) {
      setAnswer(currentQuestion, localValue);
    }
    
    if (currentQuestion === quizQuestions.length) {
      completeQuiz();
    } else {
      setIsAnimating(true);
      setTimeout(() => {
        nextQuestion();
        setIsAnimating(false);
      }, 300);
    }
  };

  const handlePrev = () => {
    if (isAnimating || currentQuestion <= 1) return;
    setIsAnimating(true);
    setTimeout(() => {
      prevQuestion();
      setIsAnimating(false);
    }, 300);
  };

  const handleOptionSelect = (value: string) => {
    if (question?.type === 'multi') {
      const current = Array.isArray(localValue) ? localValue : [];
      if (current.includes(value)) {
        setLocalValue(current.filter(v => v !== value));
      } else {
        setLocalValue([...current, value]);
      }
    } else {
      setLocalValue(value);
      setAnswer(currentQuestion, value);

      // For the last question, don't auto-advance - let the button handle it
      if (currentQuestion < quizQuestions.length) {
        setTimeout(() => {
          nextQuestion();
        }, 400);
      }
    }
  };

  const handleSliderChange = (value: number) => {
    setSliderValue(value);
    setLocalValue(value);
  };

  const canProceed = () => {
    if (question?.type === 'text') return typeof localValue === 'string' && localValue.length > 5;
    if (question?.type === 'multi') return Array.isArray(localValue) && localValue.length > 0;
    if (question?.type === 'slider') return true;
    return localValue !== '';
  };

  if (!quizStarted || currentQuestion === 0) {
    return null;
  }

  return (
    <section id="quiz-section" className="min-h-screen py-20 px-4 relative">
      <div className="absolute inset-0 mesh-bg opacity-50" />
      
      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Progress bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-vibe-muted">VIBE METER</span>
            <span className="text-sm font-mono text-vibe-pink">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-vibe-dark rounded-full overflow-hidden">
            <motion.div
              className="h-full progress-fill rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {question && (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="glass-card p-8 md:p-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-mono text-vibe-muted">
                  QUESTION {currentQuestion} OF {quizQuestions.length}
                </span>
              </div>

              <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
                {question.question}
              </h2>
              
              {question.subtext && (
                <p className="text-vibe-muted mb-8">{question.subtext}</p>
              )}

              <div className="mb-8">
                {question.type === 'text' && (
                  <TextInput
                    value={localValue as string}
                    onChange={setLocalValue}
                    placeholder={question.placeholder}
                    examples={question.examples}
                    onSubmit={handleNext}
                  />
                )}

                {question.type === 'cards' && (
                  <CardsInput
                    options={question.options || []}
                    value={localValue as string}
                    onChange={handleOptionSelect}
                  />
                )}

                {question.type === 'single' && (
                  <SingleSelect
                    options={question.options || []}
                    value={localValue as string}
                    onChange={handleOptionSelect}
                  />
                )}

                {question.type === 'multi' && (
                  <MultiSelect
                    options={question.options || []}
                    value={localValue as string[]}
                    onChange={handleOptionSelect}
                  />
                )}

                {question.type === 'slider' && (
                  <SliderInput
                    value={sliderValue}
                    onChange={handleSliderChange}
                    min={question.min || 0}
                    max={question.max || 10}
                    labels={question.sliderLabels}
                    emojiScale={question.emojiScale}
                  />
                )}

                {question.type === 'timeline' && (
                  <TimelineInput
                    options={question.options || []}
                    value={localValue as string}
                    onChange={handleOptionSelect}
                  />
                )}
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <button
                  onClick={handlePrev}
                  disabled={currentQuestion <= 1}
                  className="flex items-center gap-2 px-4 py-2 text-vibe-muted hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>

                {(question.type === 'text' ||
                  question.type === 'multi' ||
                  question.type === 'slider' ||
                  (question.type === 'single' && currentQuestion === quizQuestions.length) ||
                  (question.type === 'timeline' && currentQuestion === quizQuestions.length)) && (
                  <motion.button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="flex items-center gap-2 px-8 py-3 rounded-full font-semibold
                               bg-gradient-to-r from-vibe-pink to-vibe-purple text-white
                               disabled:opacity-30 disabled:cursor-not-allowed
                               hover:shadow-lg hover:shadow-vibe-pink/30 transition-all"
                    whileHover={{ scale: canProceed() ? 1.02 : 1 }}
                    whileTap={{ scale: canProceed() ? 0.98 : 1 }}
                  >
                    {currentQuestion === quizQuestions.length ? (
                      <>
                        <Sparkles className="w-5 h-5" />
                        See My Results
                      </>
                    ) : (
                      <>
                        Continue
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// Text Input Component
function TextInput({ 
  value, 
  onChange, 
  placeholder, 
  examples,
  onSubmit 
}: { 
  value: string; 
  onChange: (v: string) => void; 
  placeholder?: string;
  examples?: string[];
  onSubmit: () => void;
}) {
  const [exampleIndex, setExampleIndex] = useState(0);

  useEffect(() => {
    if (examples && examples.length > 0) {
      const interval = setInterval(() => {
        setExampleIndex(i => (i + 1) % examples.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [examples]);

  return (
    <div className="space-y-4">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-32 p-4 bg-vibe-dark/50 border border-white/10 rounded-xl
                   text-white placeholder:text-vibe-muted/50 resize-none
                   focus:outline-none focus:border-vibe-pink/50 focus:ring-2 focus:ring-vibe-pink/20
                   transition-all"
      />
      
      {examples && examples.length > 0 && (
        <div className="flex items-start gap-2 text-sm">
          <img src="/images/emojis/site/icon-lightbulb.png" alt="lightbulb" className="w-8 h-8 mt-0.5" />
          <AnimatePresence mode="wait">
            <motion.span
              key={exampleIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-vibe-muted italic"
            >
              "{examples[exampleIndex]}"
            </motion.span>
          </AnimatePresence>
        </div>
      )}

      <motion.button
        onClick={onSubmit}
        disabled={value.length < 6}
        className="w-full py-4 rounded-xl font-semibold text-lg
                   bg-gradient-to-r from-vibe-pink to-vibe-purple text-white
                   disabled:opacity-30 disabled:cursor-not-allowed
                   hover:shadow-lg hover:shadow-vibe-pink/30 transition-all"
        whileHover={{ scale: value.length >= 6 ? 1.01 : 1 }}
        whileTap={{ scale: value.length >= 6 ? 0.99 : 1 }}
      >
        <span className="flex items-center justify-center gap-2">
          Next Step
          <ArrowRight className="w-5 h-5" />
        </span>
      </motion.button>
    </div>
  );
}

// Cards Input Component
function CardsInput({ 
  options, 
  value, 
  onChange 
}: { 
  options: { id: string; label: string; emoji?: string; description?: string; value: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {options.map((option) => (
        <motion.button
          key={option.id}
          onClick={() => onChange(option.value)}
          className={`relative p-4 rounded-xl border text-left transition-all
            ${value === option.value 
              ? 'border-vibe-pink bg-vibe-pink/20 shadow-lg shadow-vibe-pink/20' 
              : 'border-white/10 bg-vibe-dark/30 hover:border-vibe-pink/50 hover:bg-vibe-dark/50'}`}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          {option.emoji && (
            option.emoji.startsWith('/') ? (
              <img src={option.emoji} alt={option.label} className="w-16 h-16 mb-2 object-contain drop-shadow-[0_0_8px_rgba(255,20,147,0.5)]" />
            ) : (
              <span className="text-2xl mb-2 block">{option.emoji}</span>
            )
          )}
          <span className="font-semibold text-sm block mb-1">{option.label}</span>
          {option.description && (
            <span className="text-xs text-vibe-muted">{option.description}</span>
          )}
          {value === option.value && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-2 right-2 w-5 h-5 bg-vibe-pink rounded-full flex items-center justify-center"
            >
              <Check className="w-3 h-3 text-white" />
            </motion.div>
          )}
        </motion.button>
      ))}
    </div>
  );
}

// Single Select Component
function SingleSelect({ 
  options, 
  value, 
  onChange 
}: { 
  options: { id: string; label: string; emoji?: string; description?: string; value: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-3">
      {options.map((option) => (
        <motion.button
          key={option.id}
          onClick={() => onChange(option.value)}
          className={`relative w-full p-4 rounded-xl border text-left flex items-start gap-4 transition-all
            ${value === option.value 
              ? 'border-vibe-pink bg-vibe-pink/20 shadow-lg shadow-vibe-pink/20' 
              : 'border-white/10 bg-vibe-dark/30 hover:border-vibe-pink/50 hover:bg-vibe-dark/50'}`}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          {option.emoji && (
            option.emoji.endsWith('.png') || option.emoji.endsWith('.jpg') || option.emoji.endsWith('.svg') ? (
              <img src={option.emoji} alt="" className="w-16 h-16 object-contain flex-shrink-0" />
            ) : (
              <span className="text-2xl flex-shrink-0">{option.emoji}</span>
            )
          )}
          <div className="flex-1">
            <span className="font-semibold block mb-1">{option.label}</span>
            {option.description && (
              <span className="text-sm text-vibe-muted">{option.description}</span>
            )}
          </div>
          {value === option.value && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-6 h-6 bg-vibe-pink rounded-full flex items-center justify-center flex-shrink-0"
            >
              <Check className="w-4 h-4 text-white" />
            </motion.div>
          )}
        </motion.button>
      ))}
    </div>
  );
}

// Multi Select Component
function MultiSelect({ 
  options, 
  value, 
  onChange 
}: { 
  options: { id: string; label: string; emoji?: string; value: string }[];
  value: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-3">
      {options.map((option) => {
        const isSelected = value.includes(option.value);
        return (
          <motion.button
            key={option.id}
            onClick={() => onChange(option.value)}
            className={`relative w-full p-4 rounded-xl border text-left flex items-center gap-4 transition-all
              ${isSelected 
                ? 'border-vibe-pink bg-vibe-pink/20' 
                : 'border-white/10 bg-vibe-dark/30 hover:border-vibe-pink/50'}`}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all
              ${isSelected ? 'bg-vibe-pink border-vibe-pink' : 'border-white/30'}`}
            >
              {isSelected && <Check className="w-4 h-4 text-white" />}
            </div>
            {option.emoji && (
              option.emoji.endsWith('.png') || option.emoji.endsWith('.jpg') || option.emoji.endsWith('.svg') ? (
                <img src={option.emoji} alt="" className="w-16 h-16 object-contain" />
              ) : (
                <span className="text-xl">{option.emoji}</span>
              )
            )}
            <span className="font-medium">{option.label}</span>
          </motion.button>
        );
      })}
      
      {value.length > 0 && (
        <p className="text-sm text-vibe-pink mt-4">
          {value.length} frustration{value.length > 1 ? 's' : ''} identified — we hear you!
        </p>
      )}
    </div>
  );
}

// Slider Input Component
function SliderInput({ 
  value, 
  onChange, 
  min, 
  max, 
  labels,
  emojiScale 
}: { 
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  labels?: { low: string; high: string };
  emojiScale?: string[];
}) {
  const emoji = emojiScale ? emojiScale[value] : '🙂';
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center">
        <motion.div
          key={value}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-4"
        >
          {emoji && (emoji.endsWith('.png') || emoji.endsWith('.jpg') || emoji.endsWith('.svg')) ? (
            <img src={emoji} alt="" className="w-24 h-24 object-contain" />
          ) : (
            <span className="text-6xl">{emoji}</span>
          )}
        </motion.div>
        <span className="text-4xl font-display font-bold text-vibe-pink">
          {value}
        </span>
      </div>
      
      <div className="relative pt-2">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-3 bg-vibe-dark rounded-full appearance-none cursor-pointer
                     [&::-webkit-slider-thumb]:appearance-none
                     [&::-webkit-slider-thumb]:w-8
                     [&::-webkit-slider-thumb]:h-8
                     [&::-webkit-slider-thumb]:rounded-full
                     [&::-webkit-slider-thumb]:bg-gradient-to-r
                     [&::-webkit-slider-thumb]:from-vibe-pink
                     [&::-webkit-slider-thumb]:to-vibe-purple
                     [&::-webkit-slider-thumb]:cursor-grab
                     [&::-webkit-slider-thumb]:shadow-lg
                     [&::-webkit-slider-thumb]:shadow-vibe-pink/50
                     [&::-webkit-slider-thumb]:transition-transform
                     [&::-webkit-slider-thumb]:hover:scale-110"
          style={{
            background: `linear-gradient(to right, #FF1493 0%, #FF1493 ${(value / max) * 100}%, #1A1A1A ${(value / max) * 100}%, #1A1A1A 100%)`
          }}
        />
        
        <div className="flex justify-between mt-4">
          {[...Array(max + 1)].map((_, i) => (
            <div
              key={i}
              className={`w-1 h-1 rounded-full transition-colors ${
                i <= value ? 'bg-vibe-pink' : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
      
      {labels && (
        <div className="flex justify-between text-sm text-vibe-muted">
          <span>{labels.low}</span>
          <span>{labels.high}</span>
        </div>
      )}
    </div>
  );
}

// Timeline Input Component
function TimelineInput({ 
  options, 
  value, 
  onChange 
}: { 
  options: { id: string; label: string; emoji?: string; description?: string; value: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute top-8 left-0 right-0 h-1 bg-vibe-dark rounded-full hidden md:block" />
      
      <div className="flex flex-col md:flex-row md:justify-between gap-4 md:gap-2">
        {options.map((option, index) => {
          const isSelected = value === option.value;
          return (
            <motion.button
              key={option.id}
              onClick={() => onChange(option.value)}
              className="flex-1 flex flex-col items-center text-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-3
                  transition-all border-2 ${
                    isSelected
                      ? 'bg-vibe-pink border-vibe-pink shadow-lg shadow-vibe-pink/50'
                      : 'bg-vibe-dark border-white/20 hover:border-vibe-pink/50'
                  }`}
                animate={isSelected ? { scale: [1, 1.1, 1] } : {}}
              >
                {option.emoji && (
                  (option.emoji.endsWith('.png') || option.emoji.endsWith('.jpg') || option.emoji.endsWith('.svg')) ? (
                    <img src={option.emoji} alt="" className="w-10 h-10 object-contain" />
                  ) : (
                    option.emoji
                  )
                )}
              </motion.div>
              <span className={`font-semibold text-sm ${isSelected ? 'text-vibe-pink' : 'text-white'}`}>
                {option.label}
              </span>
              {option.description && (
                <span className="text-xs text-vibe-muted mt-1">{option.description}</span>
              )}
              
              {/* Connector line on mobile */}
              {index < options.length - 1 && (
                <div className="w-1 h-8 bg-vibe-dark/50 my-2 md:hidden" />
              )}
            </motion.button>
          );
        })}
      </div>
      
      {value && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-vibe-muted mt-8 text-sm"
        >
          {value === 'urgent' && "I get it — you needed this yesterday. Let's talk about what's actually possible."}
          {value === 'next-month' && "Perfect timing. We can make that happen with the right plan."}
          {value === '2-3-months' && "Great timeline for doing this right, not just fast."}
          {value === '3-6-months' && "Love the forward thinking. Let's plan something amazing."}
          {value === 'exploring' && "No pressure — let's just chat about what's possible."}
        </motion.p>
      )}
    </div>
  );
}
