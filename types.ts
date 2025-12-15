export type RateFrequency = 'monthly' | 'yearly';
export type PeriodFrequency = 'months' | 'years';

export interface CalculationResult {
  month: number;
  totalInvested: number;
  totalInterest: number;
  totalAmount: number;
}

export interface SummaryData {
  totalInvested: number;
  totalInterest: number;
  finalAmount: number;
  monthlyBreakdown: CalculationResult[];
}