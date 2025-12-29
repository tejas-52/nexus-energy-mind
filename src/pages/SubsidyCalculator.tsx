import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Calculator,
  IndianRupee, 
  Building2,
  Sun,
  Percent,
  CheckCircle,
  Info
} from 'lucide-react';

// PM Surya Ghar Yojana subsidies (as of 2024)
const centralSubsidy = {
  upTo2kW: 30000, // ₹30,000 per kW for first 2kW
  above2kW: 18000, // ₹18,000 per kW for 2-3kW
  maxSubsidy: 78000, // Maximum ₹78,000 for 3kW
};

// State-wise additional subsidies and cost estimates
const stateData: Record<string, { subsidyPerKW: number; costPerKW: number; name: string; nameHi: string }> = {
  'andhra-pradesh': { subsidyPerKW: 0, costPerKW: 55000, name: 'Andhra Pradesh', nameHi: 'आंध्र प्रदेश' },
  'bihar': { subsidyPerKW: 0, costPerKW: 52000, name: 'Bihar', nameHi: 'बिहार' },
  'delhi': { subsidyPerKW: 2000, costPerKW: 60000, name: 'Delhi', nameHi: 'दिल्ली' },
  'gujarat': { subsidyPerKW: 10000, costPerKW: 50000, name: 'Gujarat', nameHi: 'गुजरात' },
  'haryana': { subsidyPerKW: 0, costPerKW: 55000, name: 'Haryana', nameHi: 'हरियाणा' },
  'karnataka': { subsidyPerKW: 0, costPerKW: 52000, name: 'Karnataka', nameHi: 'कर्नाटक' },
  'kerala': { subsidyPerKW: 5000, costPerKW: 58000, name: 'Kerala', nameHi: 'केरल' },
  'madhya-pradesh': { subsidyPerKW: 0, costPerKW: 50000, name: 'Madhya Pradesh', nameHi: 'मध्य प्रदेश' },
  'maharashtra': { subsidyPerKW: 0, costPerKW: 55000, name: 'Maharashtra', nameHi: 'महाराष्ट्र' },
  'punjab': { subsidyPerKW: 5000, costPerKW: 55000, name: 'Punjab', nameHi: 'पंजाब' },
  'rajasthan': { subsidyPerKW: 0, costPerKW: 48000, name: 'Rajasthan', nameHi: 'राजस्थान' },
  'tamil-nadu': { subsidyPerKW: 0, costPerKW: 55000, name: 'Tamil Nadu', nameHi: 'तमिलनाडु' },
  'telangana': { subsidyPerKW: 0, costPerKW: 52000, name: 'Telangana', nameHi: 'तेलंगाना' },
  'uttar-pradesh': { subsidyPerKW: 0, costPerKW: 50000, name: 'Uttar Pradesh', nameHi: 'उत्तर प्रदेश' },
  'west-bengal': { subsidyPerKW: 0, costPerKW: 55000, name: 'West Bengal', nameHi: 'पश्चिम बंगाल' },
  'odisha': { subsidyPerKW: 0, costPerKW: 50000, name: 'Odisha', nameHi: 'ओडिशा' },
  'jharkhand': { subsidyPerKW: 0, costPerKW: 52000, name: 'Jharkhand', nameHi: 'झारखंड' },
  'assam': { subsidyPerKW: 0, costPerKW: 55000, name: 'Assam', nameHi: 'असम' },
  'chhattisgarh': { subsidyPerKW: 0, costPerKW: 50000, name: 'Chhattisgarh', nameHi: 'छत्तीसगढ़' },
  'uttarakhand': { subsidyPerKW: 5000, costPerKW: 55000, name: 'Uttarakhand', nameHi: 'उत्तराखंड' },
};

interface SubsidyResult {
  centralSubsidy: number;
  stateSubsidy: number;
  totalSubsidy: number;
  estimatedCost: number;
  netCost: number;
  savingsPercent: number;
}

const SubsidyCalculator = () => {
  const { t, language } = useLanguage();
  const [selectedState, setSelectedState] = useState('');
  const [systemSize, setSystemSize] = useState(3);
  const [result, setResult] = useState<SubsidyResult | null>(null);

  const calculateSubsidy = () => {
    if (!selectedState) return;

    const state = stateData[selectedState];
    
    // Calculate central subsidy (PM Surya Ghar)
    let central = 0;
    if (systemSize <= 2) {
      central = systemSize * centralSubsidy.upTo2kW;
    } else if (systemSize <= 3) {
      central = (2 * centralSubsidy.upTo2kW) + ((systemSize - 2) * centralSubsidy.above2kW);
    } else {
      central = centralSubsidy.maxSubsidy; // Max subsidy is for 3kW only
    }
    
    // State subsidy
    const stateAmount = Math.min(systemSize, 10) * state.subsidyPerKW;
    
    // Total cost
    const estimatedCost = systemSize * state.costPerKW;
    const totalSubsidy = central + stateAmount;
    const netCost = Math.max(0, estimatedCost - totalSubsidy);
    const savingsPercent = (totalSubsidy / estimatedCost) * 100;

    setResult({
      centralSubsidy: central,
      stateSubsidy: stateAmount,
      totalSubsidy,
      estimatedCost,
      netCost,
      savingsPercent,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="energy" className="mb-4">
            <Calculator className="w-3 h-3 mr-1" />
            PM Surya Ghar Yojana
          </Badge>
          <h1 className="font-display text-3xl lg:text-5xl font-bold mb-4 text-foreground">
            {t('subsidy.title')} <span className="text-gradient-primary">{t('subsidy.titleHighlight')}</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('subsidy.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Input Panel */}
          <Card variant="glass" className="p-6">
            <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-accent" />
              {language === 'hi' ? 'विवरण दर्ज करें' : 'Enter Details'}
            </h2>

            <div className="space-y-6">
              {/* State Selection */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  {t('subsidy.selectState')}
                </Label>
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger>
                    <SelectValue placeholder={language === 'hi' ? 'राज्य चुनें' : 'Select state'} />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(stateData).map(([key, state]) => (
                      <SelectItem key={key} value={key}>
                        {language === 'hi' ? state.nameHi : state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* System Size */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label className="flex items-center gap-2">
                    <Sun className="w-4 h-4" />
                    {t('subsidy.systemSize')}
                  </Label>
                  <span className="text-sm font-medium text-primary">{systemSize} kW</span>
                </div>
                <Slider
                  value={[systemSize]}
                  onValueChange={([v]) => setSystemSize(v)}
                  min={1}
                  max={10}
                  step={0.5}
                />
                <p className="text-xs text-muted-foreground">
                  {language === 'hi' 
                    ? '* 3kW तक अधिकतम सब्सिडी उपलब्ध है' 
                    : '* Maximum subsidy available up to 3kW'}
                </p>
              </div>

              {/* Info Box */}
              <div className="bg-accent/10 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-accent mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-accent mb-1">
                      {language === 'hi' ? 'पीएम सूर्य घर योजना' : 'PM Surya Ghar Yojana'}
                    </p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• {language === 'hi' ? '2kW तक: ₹30,000/kW' : 'Up to 2kW: ₹30,000/kW'}</li>
                      <li>• {language === 'hi' ? '2-3kW: ₹18,000/kW' : '2-3kW: ₹18,000/kW'}</li>
                      <li>• {language === 'hi' ? 'अधिकतम: ₹78,000' : 'Maximum: ₹78,000'}</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Button 
                variant="hero" 
                size="lg" 
                className="w-full"
                onClick={calculateSubsidy}
                disabled={!selectedState}
              >
                <Calculator className="w-5 h-5 mr-2" />
                {t('subsidy.calculate')}
              </Button>
            </div>
          </Card>

          {/* Results Panel */}
          <div className="space-y-6">
            {result ? (
              <>
                {/* Main Results */}
                <Card variant="glow" className="p-6">
                  <h2 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    {t('subsidy.results')}
                  </h2>

                  <div className="space-y-4">
                    {/* Central Subsidy */}
                    <div className="bg-secondary/50 rounded-xl p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-muted-foreground">{t('subsidy.central')}</p>
                          <p className="text-xs text-muted-foreground">
                            (केंद्र सरकार / Central Govt)
                          </p>
                        </div>
                        <p className="font-display text-xl font-bold text-green-500">
                          ₹{result.centralSubsidy.toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>

                    {/* State Subsidy */}
                    <div className="bg-secondary/50 rounded-xl p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-muted-foreground">{t('subsidy.state')}</p>
                          <p className="text-xs text-muted-foreground">
                            (राज्य सरकार / State Govt)
                          </p>
                        </div>
                        <p className="font-display text-xl font-bold text-blue-500">
                          ₹{result.stateSubsidy.toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-border my-4" />

                    {/* Total Subsidy */}
                    <div className="bg-primary/10 rounded-xl p-4">
                      <div className="flex justify-between items-center">
                        <p className="font-semibold">{t('subsidy.totalSubsidy')}</p>
                        <p className="font-display text-2xl font-bold text-primary">
                          ₹{result.totalSubsidy.toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Cost Breakdown */}
                <Card variant="glass" className="p-6">
                  <h3 className="font-display font-semibold mb-4">
                    {language === 'hi' ? 'लागत विवरण' : 'Cost Breakdown'}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <p className="text-muted-foreground">{t('subsidy.estimatedCost')}</p>
                      <p className="font-semibold">₹{result.estimatedCost.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-muted-foreground">{t('subsidy.totalSubsidy')}</p>
                      <p className="font-semibold text-green-500">- ₹{result.totalSubsidy.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="border-t border-border pt-4">
                      <div className="flex justify-between">
                        <p className="font-semibold">{t('subsidy.netCost')}</p>
                        <p className="font-display text-xl font-bold text-primary">₹{result.netCost.toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Savings Badge */}
                <Card variant="glass" className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                        <Percent className="w-6 h-6 text-green-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{t('subsidy.youSave')}</p>
                        <p className="font-display text-xl font-bold text-green-500">
                          {result.savingsPercent.toFixed(0)}%
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        {language === 'hi' ? 'कुल बचत' : 'Total Savings'}
                      </p>
                      <p className="font-display text-xl font-bold">
                        ₹{result.totalSubsidy.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Note */}
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-xs text-muted-foreground flex items-start gap-2">
                    <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    {t('subsidy.note')}
                  </p>
                </div>
              </>
            ) : (
              <Card variant="glass" className="p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <IndianRupee className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">
                  {language === 'hi' ? 'सब्सिडी की गणना करें' : 'Calculate Your Subsidy'}
                </h3>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  {language === 'hi' 
                    ? 'अपना राज्य और सिस्टम साइज चुनें और सरकारी सब्सिडी देखें'
                    : 'Select your state and system size to see government subsidies available for you'}
                </p>
              </Card>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SubsidyCalculator;
