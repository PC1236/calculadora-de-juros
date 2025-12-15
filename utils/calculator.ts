import { CalculationResult, SummaryData, RateFrequency, PeriodFrequency } from '../types';

export const calculateCompoundInterest = (
  initialValue: number,
  monthlyContribution: number,
  interestRate: number,
  rateFrequency: RateFrequency,
  period: number,
  periodFrequency: PeriodFrequency
): SummaryData => {
  // Convert period to months
  const totalMonths = periodFrequency === 'years' ? period * 12 : period;

  // Convert interest rate to monthly decimal
  // We use the effective rate formula: (1 + i_annual)^(1/12) - 1 for yearly conversion
  let monthlyRate = 0;
  if (interestRate > 0) {
    const rateDecimal = interestRate / 100;
    if (rateFrequency === 'yearly') {
      monthlyRate = Math.pow(1 + rateDecimal, 1 / 12) - 1;
    } else {
      monthlyRate = rateDecimal;
    }
  }

  let currentAmount = initialValue;
  let totalInvested = initialValue;
  const breakdown: CalculationResult[] = [];

  // Add initial state (Month 0)
  breakdown.push({
    month: 0,
    totalInvested: initialValue,
    totalInterest: 0,
    totalAmount: initialValue,
  });

  for (let i = 1; i <= totalMonths; i++) {
    // Calculate interest on the *previous* amount
    const interestEarned = currentAmount * monthlyRate;
    
    // Add monthly contribution
    currentAmount += interestEarned + monthlyContribution;
    totalInvested += monthlyContribution;

    breakdown.push({
      month: i,
      totalInvested: Number(totalInvested.toFixed(2)),
      totalInterest: Number((currentAmount - totalInvested).toFixed(2)),
      totalAmount: Number(currentAmount.toFixed(2)),
    });
  }

  const finalAmount = currentAmount;
  const totalInterest = finalAmount - totalInvested;

  return {
    totalInvested,
    totalInterest,
    finalAmount,
    monthlyBreakdown: breakdown,
  };
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};