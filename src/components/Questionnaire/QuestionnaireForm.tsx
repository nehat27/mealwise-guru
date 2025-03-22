
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';

const ayurvedicTypes = [
  { value: 'vata', label: 'Vata', description: 'Air and space elements - creative, energetic, and quick-thinking' },
  { value: 'pitta', label: 'Pitta', description: 'Fire and water elements - focused, ambitious, and intelligent' },
  { value: 'kapha', label: 'Kapha', description: 'Earth and water elements - calm, strong, and loyal' },
];

const dietaryRestrictions = [
  'Vegetarian',
  'Vegan',
  'Gluten-free',
  'Dairy-free',
  'Nut-free',
  'Low-carb',
  'Keto',
  'Paleo',
];

const fitnessGoals = [
  'Weight loss',
  'Muscle gain',
  'Improved endurance',
  'Increased strength',
  'Better flexibility',
  'Overall health',
  'Stress reduction',
];

const regions = [
  'North America',
  'South America',
  'Europe',
  'Africa',
  'South Asia',
  'East Asia',
  'Southeast Asia',
  'Australia/Oceania',
  'Middle East',
];

const QuestionnaireForm: React.FC = () => {
  const navigate = useNavigate();
  const { updateQuestionnaire } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    age: 30,
    gender: '',
    height: 170,
    weight: 70,
    dietaryRestrictions: [] as string[],
    fitnessGoals: [] as string[],
    healthConditions: [] as string[],
    ayurvedicType: '',
    region: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    {
      title: 'Basic Information',
      fields: ['age', 'gender', 'height', 'weight'],
    },
    {
      title: 'Dietary Preferences',
      fields: ['dietaryRestrictions'],
    },
    {
      title: 'Fitness Goals',
      fields: ['fitnessGoals'],
    },
    {
      title: 'Health Information',
      fields: ['healthConditions'],
    },
    {
      title: 'Ayurvedic Constitution',
      fields: ['ayurvedicType'],
    },
    {
      title: 'Region',
      fields: ['region'],
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (field: string, value: string) => {
    const currentValues = formData[field as keyof typeof formData] as string[];
    
    if (Array.isArray(currentValues)) {
      if (currentValues.includes(value)) {
        setFormData({
          ...formData,
          [field]: currentValues.filter(item => item !== value),
        });
      } else {
        setFormData({
          ...formData,
          [field]: [...currentValues, value],
        });
      }
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user questionnaire
      updateQuestionnaire(formData);
      
      toast.success('Your profile has been updated successfully');
      navigate('/dashboard');
    } catch (error) {
      console.error('Questionnaire submission error:', error);
      toast.error('Failed to update your profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const slideVariants = {
    hidden: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    }),
  };

  const [slideDirection, setSlideDirection] = useState(0);

  const goToNextStep = () => {
    setSlideDirection(1);
    handleNext();
  };

  const goToPreviousStep = () => {
    setSlideDirection(-1);
    handlePrevious();
  };

  const renderStepContent = () => {
    const currentStepData = steps[currentStep];

    return (
      <AnimatePresence mode="wait" custom={slideDirection}>
        <motion.div
          key={currentStep}
          custom={slideDirection}
          variants={slideVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="space-y-6"
        >
          <h2 className="text-xl font-semibold mb-4 text-center">
            {currentStepData.title}
          </h2>

          {currentStepData.fields.includes('age') && (
            <div>
              <label htmlFor="age" className="block text-sm font-medium mb-1">
                Age
              </label>
              <input
                id="age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                min="1"
                max="120"
              />
            </div>
          )}

          {currentStepData.fields.includes('gender') && (
            <div>
              <label htmlFor="gender" className="block text-sm font-medium mb-1">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-binary</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>
          )}

          {currentStepData.fields.includes('height') && (
            <div>
              <label htmlFor="height" className="block text-sm font-medium mb-1">
                Height (cm)
              </label>
              <input
                id="height"
                name="height"
                type="number"
                value={formData.height}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                min="50"
                max="250"
              />
            </div>
          )}

          {currentStepData.fields.includes('weight') && (
            <div>
              <label htmlFor="weight" className="block text-sm font-medium mb-1">
                Weight (kg)
              </label>
              <input
                id="weight"
                name="weight"
                type="number"
                value={formData.weight}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                min="20"
                max="300"
              />
            </div>
          )}

          {currentStepData.fields.includes('dietaryRestrictions') && (
            <div>
              <label className="block text-sm font-medium mb-2">Dietary Restrictions</label>
              <div className="grid grid-cols-2 gap-2">
                {dietaryRestrictions.map((restriction) => (
                  <label key={restriction} className="flex items-start p-2 border border-border rounded-lg bg-background/50 cursor-pointer hover:bg-background transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.dietaryRestrictions.includes(restriction)}
                      onChange={() => handleCheckboxChange('dietaryRestrictions', restriction)}
                      className="mt-0.5 mr-2"
                    />
                    <span>{restriction}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {currentStepData.fields.includes('fitnessGoals') && (
            <div>
              <label className="block text-sm font-medium mb-2">Fitness Goals</label>
              <div className="grid grid-cols-2 gap-2">
                {fitnessGoals.map((goal) => (
                  <label key={goal} className="flex items-start p-2 border border-border rounded-lg bg-background/50 cursor-pointer hover:bg-background transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.fitnessGoals.includes(goal)}
                      onChange={() => handleCheckboxChange('fitnessGoals', goal)}
                      className="mt-0.5 mr-2"
                    />
                    <span>{goal}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {currentStepData.fields.includes('healthConditions') && (
            <div>
              <label htmlFor="healthConditions" className="block text-sm font-medium mb-1">
                Health Conditions (Optional)
              </label>
              <textarea
                id="healthConditions"
                name="healthConditions"
                value={formData.healthConditions.join(', ')}
                onChange={(e) => setFormData({...formData, healthConditions: e.target.value.split(',').map(item => item.trim()).filter(Boolean)})}
                placeholder="Enter any health conditions separated by commas (e.g., diabetes, hypertension)"
                className="w-full px-4 py-2 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all min-h-[100px]"
              />
            </div>
          )}

          {currentStepData.fields.includes('ayurvedicType') && (
            <div>
              <label className="block text-sm font-medium mb-2">Ayurvedic Body Type</label>
              <div className="space-y-3">
                {ayurvedicTypes.map((type) => (
                  <label key={type.value} className={`flex items-start p-3 border ${formData.ayurvedicType === type.value ? 'border-primary bg-primary/5' : 'border-border bg-background/50'} rounded-lg cursor-pointer hover:bg-background/80 transition-all`}>
                    <input
                      type="radio"
                      name="ayurvedicType"
                      value={type.value}
                      checked={formData.ayurvedicType === type.value}
                      onChange={handleChange}
                      className="mt-1 mr-3"
                    />
                    <div>
                      <div className="font-medium">{type.label}</div>
                      <div className="text-sm text-foreground/70 mt-1">{type.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {currentStepData.fields.includes('region') && (
            <div>
              <label htmlFor="region" className="block text-sm font-medium mb-1">
                Your Region
              </label>
              <select
                id="region"
                name="region"
                value={formData.region}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              >
                <option value="">Select your region</option>
                {regions.map((region) => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={goToPreviousStep}
              disabled={currentStep === 0}
              className={`px-4 py-2 rounded-lg font-medium transition-all focus:outline-none ${
                currentStep === 0
                  ? 'opacity-50 cursor-not-allowed'
                  : 'text-foreground hover:bg-muted'
              }`}
            >
              Previous
            </button>

            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={goToNextStep}
                className="px-6 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 rounded-lg text-white font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                  isSubmitting
                    ? 'bg-primary/70'
                    : 'bg-primary hover:bg-primary/90'
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Complete'}
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="glass p-8 rounded-2xl shadow-lg">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2 text-center">Tell us about yourself</h1>
          <p className="text-center text-foreground/70">
            Help us create a personalized nutrition and fitness plan for you
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex-1 ${index < steps.length - 1 ? 'relative' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index <= currentStep
                      ? 'bg-primary text-white'
                      : 'bg-muted text-foreground/50'
                  } mx-auto z-10 relative`}
                >
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`absolute top-4 h-[2px] left-1/2 right-0 -translate-y-1/2 ${
                      index < currentStep ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                )}
                <div className="text-center mt-2 text-xs">
                  {step.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {renderStepContent()}
        </form>
      </div>
    </div>
  );
};

export default QuestionnaireForm;
