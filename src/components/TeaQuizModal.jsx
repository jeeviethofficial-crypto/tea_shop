import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, RotateCcw, Star } from 'lucide-react';
import { QUIZ_QUESTIONS, PRODUCTS } from '../data/products';

export default function TeaQuizModal({ isOpen, onClose, onAddToCart, onQuickView }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [matchedProduct, setMatchedProduct] = useState(null);

  if (!isOpen) return null;

  const handleSelectOption = (questionId, option) => {
    const newAnswers = { ...answers, [questionId]: option };
    setAnswers(newAnswers);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate match
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers) => {
    // Intelligent heuristic matching
    const timeChoice = finalAnswers.time?.id;
    const tasteChoice = finalAnswers.taste?.id;
    
    let matchId = "zen-01"; // Default to Ceremonial Matcha

    if (timeChoice === 'evening') {
      matchId = "zen-05"; // Kyoto Twilight Botanical Tisane
    } else if (tasteChoice === 'roasted' || timeChoice === 'afternoon') {
      matchId = "zen-03"; // Wuyi Cliff Da Hong Pao
    } else if (tasteChoice === 'umami') {
      matchId = "zen-02"; // Imperial Gyokuro
    } else if (finalAnswers.ritual?.id === 'infuser') {
      matchId = "zen-04"; // Nuwara Eliya High Grown Ceylon
    }

    const matched = PRODUCTS.find(p => p.id === matchId) || PRODUCTS[0];
    setMatchedProduct(matched);
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setMatchedProduct(null);
  };

  const currentQ = QUIZ_QUESTIONS[currentStep];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#1F2937]/60 backdrop-blur-xs transition-opacity"
      ></div>

      <div className="min-h-full flex items-center justify-center p-4 sm:p-6">
        <div className="relative bg-[#FAF8F5] rounded-3xl max-w-lg w-full border border-[#E8E4DC] shadow-2xl p-6 sm:p-8 overflow-hidden text-left">
          
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-[#9CA3AF] hover:text-[#1F2937] hover:bg-[#E8E4DC]/50 rounded-full transition-colors"
            aria-label="Close quiz"
          >
            <X className="w-5 h-5" />
          </button>

          {!matchedProduct ? (
            /* Quiz Questions View */
            <div>
              {/* Progress Tracker */}
              <div className="flex items-center justify-between text-xs font-semibold text-[#52796F] uppercase tracking-wider mb-2">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>The Mindful Palate Quiz</span>
                </span>
                <span className="font-mono">Step {currentStep + 1} of {QUIZ_QUESTIONS.length}</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-[#E8E4DC] h-1.5 rounded-full overflow-hidden mb-6">
                <div
                  className="bg-[#3E5F44] h-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                ></div>
              </div>

              {/* Question */}
              <h3 className="font-zen-serif text-2xl sm:text-3xl font-bold text-[#1F2937] leading-tight mb-1.5">
                {currentQ.question}
              </h3>
              <p className="text-xs text-[#6B7280] mb-6">
                {currentQ.subtitle}
              </p>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleSelectOption(currentQ.id, option)}
                    className="w-full p-4 rounded-2xl bg-white border border-[#E8E4DC] hover:border-[#3E5F44] hover:bg-[#F3EFEA] text-left transition-all group flex items-center justify-between shadow-xs hover:shadow-md"
                  >
                    <div>
                      <h4 className="font-medium text-sm text-[#1F2937] group-hover:text-[#3E5F44]">
                        {option.label}
                      </h4>
                      <p className="text-xs text-[#6B7280] mt-0.5">
                        {option.hint}
                      </p>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-[#FAF8F5] group-hover:bg-[#3E5F44] group-hover:text-white border border-[#E8E4DC] flex items-center justify-center text-[#9CA3AF] transition-colors shrink-0 ml-3">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </button>
                ))}
              </div>

              {/* Back button if past step 1 */}
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="mt-6 text-xs text-[#6B7280] hover:text-[#1F2937] underline font-medium"
                >
                  ← Previous question
                </button>
              )}
            </div>
          ) : (
            /* Result View */
            <div className="text-center animate-in fade-in duration-300">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3E5F44]/10 text-[#3E5F44] text-xs font-semibold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>99% Terroir Affinity Match</span>
              </div>

              <h3 className="font-zen-serif text-3xl font-bold text-[#1F2937] mb-1">
                Your Tea Soulmate
              </h3>
              <p className="text-xs text-[#6B7280] max-w-sm mx-auto mb-5">
                Based on your daily ritual rhythms and flavor preferences, our tea sommelier selected this single-estate gem:
              </p>

              {/* Result Product Card */}
              <div className="p-4 bg-white rounded-2xl border border-[#E8E4DC] flex items-center gap-4 text-left shadow-md mb-6">
                <img
                  src={matchedProduct.image}
                  alt={matchedProduct.name}
                  className="w-20 h-20 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#52796F] font-bold block">
                    {matchedProduct.origin}
                  </span>
                  <h4 className="font-zen-serif text-lg font-bold text-[#1F2937] leading-tight">
                    {matchedProduct.name}
                  </h4>
                  <div className="flex items-center gap-1 text-xs text-[#C5A059] mt-1 font-semibold">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{matchedProduct.rating}</span>
                    <span className="text-[#9CA3AF]">({matchedProduct.reviewsCount} reviews)</span>
                  </div>
                  <p className="text-xs text-[#1F2937] font-bold mt-1">
                    From ${matchedProduct.variants[0].price}
                  </p>
                </div>
              </div>

              {/* Tasting Notes */}
              <div className="flex flex-wrap justify-center gap-1.5 mb-6">
                {matchedProduct.flavorNotes.map((note, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-[#F3EFEA] text-[#52796F] font-medium border border-[#E8E4DC]">
                    {note}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onAddToCart(matchedProduct, matchedProduct.variants[0]);
                    onClose();
                  }}
                  className="flex-1 py-3 px-5 bg-[#3E5F44] hover:bg-[#294432] text-white text-xs font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4 text-[#C5A059]" />
                  <span>Add Recommended Tea to Cart</span>
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="py-3 px-4 bg-white hover:bg-[#FAF8F5] border border-[#E8E4DC] text-[#1F2937] text-xs font-medium rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#52796F]" />
                  <span>Retake</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
