import React, { useState, useMemo } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { 
  Calculator, 
  TrendingUp, 
  PiggyBank, 
  Coins,
  RefreshCcw 
} from 'lucide-react';
import { InputGroup } from './components/InputGroup';
import { SummaryCard } from './components/SummaryCard';
import { calculateCompoundInterest, formatCurrency } from './utils/calculator';
import { RateFrequency, PeriodFrequency } from './types';

const App: React.FC = () => {
  // --- State ---
  const [initialValue, setInitialValue] = useState<number>(1000);
  const [monthlyValue, setMonthlyValue] = useState<number>(500);
  
  const [interestRate, setInterestRate] = useState<number>(10);
  const [rateFrequency, setRateFrequency] = useState<RateFrequency>('yearly');
  
  const [period, setPeriod] = useState<number>(10);
  const [periodFrequency, setPeriodFrequency] = useState<PeriodFrequency>('years');

  // --- Derived State (Calculations) ---
  const results = useMemo(() => {
    return calculateCompoundInterest(
      initialValue,
      monthlyValue,
      interestRate,
      rateFrequency,
      period,
      periodFrequency
    );
  }, [initialValue, monthlyValue, interestRate, rateFrequency, period, periodFrequency]);

  // --- Reset Handler ---
  const handleReset = () => {
    setInitialValue(1000);
    setMonthlyValue(500);
    setInterestRate(10);
    setRateFrequency('yearly');
    setPeriod(10);
    setPeriodFrequency('years');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-12">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-600 p-2 rounded-lg">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-100 tracking-tight">
              Simulador de Juros Compostos
            </h1>
          </div>
          <button 
            onClick={handleReset}
            className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-emerald-500 transition-colors"
          >
            <RefreshCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Limpar dados</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Inputs */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-800">
              <h2 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-2">
                <Coins className="w-5 h-5 text-emerald-500" />
                Parâmetros
              </h2>
              
              <div className="space-y-6">
                <InputGroup
                  label="Valor Inicial"
                  value={initialValue}
                  onChange={setInitialValue}
                  prefix="R$"
                  step={100}
                />

                <InputGroup
                  label="Aporte Mensal"
                  value={monthlyValue}
                  onChange={setMonthlyValue}
                  prefix="R$"
                  step={50}
                />

                <InputGroup
                  label="Taxa de Juros"
                  value={interestRate}
                  onChange={setInterestRate}
                  step={0.1}
                  toggleOptions={{
                    value: rateFrequency,
                    onChange: (v) => setRateFrequency(v as RateFrequency),
                    options: [
                      { label: '% Anual', value: 'yearly' },
                      { label: '% Mensal', value: 'monthly' },
                    ],
                  }}
                />

                <InputGroup
                  label="Período"
                  value={period}
                  onChange={setPeriod}
                  toggleOptions={{
                    value: periodFrequency,
                    onChange: (v) => setPeriodFrequency(v as PeriodFrequency),
                    options: [
                      { label: 'Anos', value: 'years' },
                      { label: 'Meses', value: 'months' },
                    ],
                  }}
                />
              </div>
            </div>

            {/* Helper Info */}
            <div className="bg-emerald-950/30 p-4 rounded-lg border border-emerald-900/50">
              <h3 className="text-emerald-400 font-medium mb-2 text-sm">Entenda o cálculo</h3>
              <p className="text-emerald-500/80 text-xs leading-relaxed">
                Este simulador utiliza a fórmula de juros compostos com aportes mensais. 
                Se a taxa for anual, ela é convertida para uma taxa mensal equivalente. 
                O resultado demonstra o poder do tempo e da constância nos seus investimentos.
              </p>
            </div>
          </div>

          {/* Right Column: Results & Chart */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <SummaryCard
                title="Total Investido"
                value={formatCurrency(results.totalInvested)}
                icon={PiggyBank}
                colorClass="text-slate-300"
                bgColorClass="bg-slate-700"
              />
              <SummaryCard
                title="Total em Juros"
                value={formatCurrency(results.totalInterest)}
                icon={TrendingUp}
                colorClass="text-emerald-400"
                bgColorClass="bg-emerald-900"
              />
              <SummaryCard
                title="Valor Final"
                value={formatCurrency(results.finalAmount)}
                icon={Coins}
                colorClass="text-indigo-400"
                bgColorClass="bg-indigo-900"
              />
            </div>

            {/* Chart */}
            <div className="bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-800">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-100">Evolução do Patrimônio</h3>
                <div className="flex items-center gap-4 text-xs font-medium">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                    <span className="text-slate-400">Juros</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-slate-600"></span>
                    <span className="text-slate-400">Investido</span>
                  </div>
                </div>
              </div>

              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={results.monthlyBreakdown}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#475569" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#475569" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                    <XAxis 
                      dataKey="month" 
                      tickFormatter={(val) => {
                         const totalPoints = results.monthlyBreakdown.length;
                         if (totalPoints > 60 && val % 12 !== 0) return '';
                         if (val === 0) return 'Início';
                         return periodFrequency === 'years' ? `${val/12}a` : `${val}m`;
                      }}
                      stroke="#64748b"
                      tick={{fontSize: 12, fill: '#64748b'}}
                      tickLine={false}
                      axisLine={false}
                      minTickGap={30}
                    />
                    <YAxis 
                      tickFormatter={(value) => 
                        new Intl.NumberFormat('pt-BR', { notation: "compact", compactDisplay: "short" }).format(value)
                      }
                      stroke="#64748b"
                      tick={{fontSize: 12, fill: '#64748b'}}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip 
                      formatter={(value: number) => [formatCurrency(value), '']}
                      labelFormatter={(label) => `Mês ${label}`}
                      contentStyle={{ 
                        backgroundColor: '#1e293b', 
                        borderRadius: '8px', 
                        border: '1px solid #334155', 
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.3)',
                        color: '#f8fafc'
                      }}
                      itemStyle={{ color: '#e2e8f0' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="totalAmount" 
                      name="Total Acumulado"
                      stroke="#10b981" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorInterest)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="totalInvested" 
                      name="Total Investido"
                      stroke="#475569" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      fillOpacity={1} 
                      fill="url(#colorInvested)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;