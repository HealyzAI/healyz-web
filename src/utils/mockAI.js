// Mock AI Logic for Healyz FinHealth AI
// This simulates AI predictions for healthcare costs and insurance recommendations

export const predictHealthcareCosts = (userData) => {
  const { age, preExistingConditions, lifestyle, income, location } = userData;
  
  // Base cost calculation
  let baseCost = 2000;
  
  // Age factor
  if (age < 25) baseCost *= 0.8;
  else if (age < 35) baseCost *= 1.0;
  else if (age < 45) baseCost *= 1.3;
  else if (age < 55) baseCost *= 1.6;
  else if (age < 65) baseCost *= 2.0;
  else baseCost *= 2.5;
  
  // Pre-existing conditions factor
  const conditionMultiplier = {
    'none': 1.0,
    'diabetes': 1.8,
    'hypertension': 1.5,
    'heart_disease': 2.2,
    'asthma': 1.3,
    'arthritis': 1.4,
    'multiple': 2.5
  };
  baseCost *= conditionMultiplier[preExistingConditions] || 1.0;
  
  // Lifestyle factor
  const lifestyleMultiplier = {
    'very_healthy': 0.7,
    'healthy': 0.85,
    'average': 1.0,
    'poor': 1.4,
    'very_poor': 1.8
  };
  baseCost *= lifestyleMultiplier[lifestyle] || 1.0;
  
  // Income factor (higher income = access to better preventive care)
  if (income < 30000) baseCost *= 1.2;
  else if (income < 50000) baseCost *= 1.1;
  else if (income < 80000) baseCost *= 1.0;
  else if (income < 120000) baseCost *= 0.9;
  else baseCost *= 0.8;
  
  // Location factor (simplified)
  const locationMultiplier = {
    'urban': 1.2,
    'suburban': 1.0,
    'rural': 0.8
  };
  baseCost *= locationMultiplier[location] || 1.0;
  
  // Add some randomness to make it more realistic
  const randomFactor = 0.8 + Math.random() * 0.4; // 0.8 to 1.2
  baseCost *= randomFactor;
  
  return Math.round(baseCost);
};

export const recommendInsurance = (userData, predictedCost) => {
  const { age, income, preExistingConditions } = userData;
  
  const plans = [
    {
      id: 'basic',
      name: 'Basic Plan',
      monthlyPremium: Math.round(predictedCost * 0.08 / 12),
      deductible: 5000,
      coverage: '70%',
      maxOutOfPocket: 8000,
      features: ['Emergency Care', 'Basic Preventive Care', 'Generic Medications'],
      recommended: false
    },
    {
      id: 'standard',
      name: 'Standard Plan',
      monthlyPremium: Math.round(predictedCost * 0.12 / 12),
      deductible: 3000,
      coverage: '80%',
      maxOutOfPocket: 6000,
      features: ['Emergency Care', 'Preventive Care', 'Specialist Visits', 'Brand Medications', 'Mental Health'],
      recommended: false
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      monthlyPremium: Math.round(predictedCost * 0.18 / 12),
      deductible: 1000,
      coverage: '90%',
      maxOutOfPocket: 4000,
      features: ['Comprehensive Coverage', 'Low Deductible', 'Dental & Vision', 'Alternative Medicine', 'Wellness Programs'],
      recommended: false
    }
  ];
  
  // Recommendation logic
  if (preExistingConditions !== 'none' || age > 50) {
    plans[2].recommended = true; // Premium for high-risk
  } else if (income > 60000) {
    plans[1].recommended = true; // Standard for middle-income
  } else {
    plans[0].recommended = true; // Basic for low-income
  }
  
  return plans;
};

export const calculateBNPL = (totalAmount, months = 6) => {
  const interestRate = 0.12; // 12% annual interest
  const monthlyRate = interestRate / 12;
  
  // Calculate monthly payment with interest
  const monthlyPayment = totalAmount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                        (Math.pow(1 + monthlyRate, months) - 1);
  
  const schedule = [];
  let remainingBalance = totalAmount;
  
  for (let i = 1; i <= months; i++) {
    const interestPayment = remainingBalance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    remainingBalance -= principalPayment;
    
    schedule.push({
      month: i,
      payment: Math.round(monthlyPayment * 100) / 100,
      principal: Math.round(principalPayment * 100) / 100,
      interest: Math.round(interestPayment * 100) / 100,
      remainingBalance: Math.round(Math.max(0, remainingBalance) * 100) / 100
    });
  }
  
  return {
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalAmount: Math.round(monthlyPayment * months * 100) / 100,
    totalInterest: Math.round((monthlyPayment * months - totalAmount) * 100) / 100,
    schedule
  };
};

export const getRiskAssessment = (userData, predictedCost) => {
  const { age, preExistingConditions, lifestyle } = userData;
  
  let riskScore = 0;
  
  // Age risk
  if (age > 65) riskScore += 30;
  else if (age > 50) riskScore += 20;
  else if (age > 35) riskScore += 10;
  
  // Condition risk
  if (preExistingConditions === 'multiple') riskScore += 40;
  else if (['diabetes', 'heart_disease'].includes(preExistingConditions)) riskScore += 30;
  else if (['hypertension', 'arthritis'].includes(preExistingConditions)) riskScore += 20;
  else if (preExistingConditions === 'asthma') riskScore += 15;
  
  // Lifestyle risk
  if (lifestyle === 'very_poor') riskScore += 25;
  else if (lifestyle === 'poor') riskScore += 15;
  else if (lifestyle === 'average') riskScore += 5;
  else if (lifestyle === 'healthy') riskScore -= 5;
  else if (lifestyle === 'very_healthy') riskScore -= 10;
  
  riskScore = Math.max(0, Math.min(100, riskScore));
  
  let riskLevel = 'Low';
  let riskColor = 'green';
  
  if (riskScore > 70) {
    riskLevel = 'Very High';
    riskColor = 'red';
  } else if (riskScore > 50) {
    riskLevel = 'High';
    riskColor = 'orange';
  } else if (riskScore > 30) {
    riskLevel = 'Medium';
    riskColor = 'yellow';
  } else if (riskScore > 15) {
    riskLevel = 'Low-Medium';
    riskColor = 'lightgreen';
  }
  
  return {
    score: riskScore,
    level: riskLevel,
    color: riskColor,
    recommendations: generateRecommendations(riskScore, userData)
  };
};

const generateRecommendations = (riskScore, userData) => {
  const recommendations = [];
  
  if (riskScore > 50) {
    recommendations.push('Consider comprehensive health insurance with low deductible');
    recommendations.push('Schedule regular health check-ups every 6 months');
    recommendations.push('Build an emergency health fund of $5,000-$10,000');
  } else if (riskScore > 30) {
    recommendations.push('Standard health insurance should be sufficient');
    recommendations.push('Annual health check-ups recommended');
    recommendations.push('Consider health savings account (HSA)');
  } else {
    recommendations.push('Basic health insurance may be adequate');
    recommendations.push('Focus on preventive care and healthy lifestyle');
    recommendations.push('Consider high-deductible health plan with HSA');
  }
  
  if (userData.lifestyle === 'poor' || userData.lifestyle === 'very_poor') {
    recommendations.push('Improve diet and exercise routine');
    recommendations.push('Consider wellness programs and health coaching');
  }
  
  return recommendations;
};

