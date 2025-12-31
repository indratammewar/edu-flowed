import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, Loader2, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';

const stepSchemas = {
  1: z.object({
    email: z.string().email('Please enter a valid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  }),
  2: z.object({
    full_name: z.string().min(1, 'Full name is required').max(100),
    username: z.string().min(3, 'Username must be at least 3 characters').max(30).regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
    roll_number: z.string().min(1, 'Roll number is required').max(20),
  }),
  3: z.object({
    phone: z.string().min(10, 'Phone number must be at least 10 digits').max(15),
  }),
  4: z.object({
    course: z.string().min(1, 'Course is required'),
    year: z.number().min(1).max(6),
  }),
};

const courses = [
  'Computer Science',
  'Information Technology',
  'Electronics & Communication',
  'Mechanical Engineering',
  'Civil Engineering',
  'Electrical Engineering',
  'Business Administration',
  'Commerce',
  'Arts & Humanities',
];

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    username: '',
    roll_number: '',
    phone: '',
    course: '',
    year: 1,
  });
  
  const { signIn, signUp, user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  const updateFormData = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (step: number) => {
    try {
      const schema = stepSchemas[step as keyof typeof stepSchemas];
      if (!schema) return true;
      
      const dataForStep = step === 1 ? { email: formData.email, password: formData.password }
        : step === 2 ? { full_name: formData.full_name, username: formData.username, roll_number: formData.roll_number }
        : step === 3 ? { phone: formData.phone }
        : { course: formData.course, year: formData.year };
      
      schema.parse(dataForStep);
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((e) => {
          if (e.path[0]) {
            fieldErrors[e.path[0] as string] = e.message;
          }
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setErrors({});
  };

  const handleLogin = async () => {
    if (!validateStep(1)) return;
    
    setIsLoading(true);
    try {
      const { error } = await signIn(formData.email, formData.password);
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast.error('Invalid email or password');
        } else {
          toast.error(error.message);
        }
      } else {
        toast.success('Welcome back!');
        navigate('/');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!validateStep(4)) return;
    
    setIsLoading(true);
    try {
      const { error } = await signUp(formData.email, formData.password, formData.full_name);
      if (error) {
        if (error.message.includes('already registered')) {
          toast.error('This email is already registered. Please sign in.');
        } else {
          toast.error(error.message);
        }
        return;
      }

      // Wait for the user to be created and get the session
      const { data: { user: newUser } } = await supabase.auth.getUser();
      
      if (newUser) {
        // Update the profile with additional data
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            username: formData.username,
            roll_number: formData.roll_number,
            phone: formData.phone,
            course: formData.course,
            year: formData.year,
          })
          .eq('id', newUser.id);

        if (profileError) {
          console.error('Profile update error:', profileError);
        }
      }

      toast.success('Account created successfully! Welcome to EduFlow.');
      navigate('/');
    } catch (err) {
      toast.error('An error occurred during signup');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      handleLogin();
    } else if (currentStep === 4) {
      handleSignUp();
    } else {
      handleNextStep();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const steps = [
    { number: 1, title: 'Account' },
    { number: 2, title: 'Personal' },
    { number: 3, title: 'Contact' },
    { number: 4, title: 'Academic' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-hero flex items-center justify-center shadow-md">
              <BookOpen className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">
            {isLogin ? 'Welcome to EduFlow' : 'Create Your Account'}
          </CardTitle>
          <CardDescription>
            {isLogin
              ? 'Sign in to access your academic dashboard'
              : `Step ${currentStep} of 4: ${steps[currentStep - 1].title} Details`}
          </CardDescription>
        </CardHeader>

        {/* Progress Steps - Only show for signup */}
        {!isLogin && (
          <div className="px-6 pb-4">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                      currentStep > step.number
                        ? 'bg-success text-success-foreground'
                        : currentStep === step.number
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {currentStep > step.number ? <Check className="w-4 h-4" /> : step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-12 h-1 mx-1 rounded ${
                        currentStep > step.number ? 'bg-success' : 'bg-muted'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Login or Step 1: Email & Password */}
            {(isLogin || currentStep === 1) && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@college.edu"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    disabled={isLoading}
                    className="h-11"
                  />
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => updateFormData('password', e.target.value)}
                    disabled={isLoading}
                    className="h-11"
                  />
                  {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                </div>
              </>
            )}

            {/* Step 2: Personal Info */}
            {!isLogin && currentStep === 2 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input
                    id="full_name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.full_name}
                    onChange={(e) => updateFormData('full_name', e.target.value)}
                    disabled={isLoading}
                    className="h-11"
                  />
                  {errors.full_name && <p className="text-sm text-destructive">{errors.full_name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="johndoe123"
                    value={formData.username}
                    onChange={(e) => updateFormData('username', e.target.value.toLowerCase())}
                    disabled={isLoading}
                    className="h-11"
                  />
                  {errors.username && <p className="text-sm text-destructive">{errors.username}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="roll_number">Roll Number</Label>
                  <Input
                    id="roll_number"
                    type="text"
                    placeholder="CS2024001"
                    value={formData.roll_number}
                    onChange={(e) => updateFormData('roll_number', e.target.value.toUpperCase())}
                    disabled={isLoading}
                    className="h-11"
                  />
                  {errors.roll_number && <p className="text-sm text-destructive">{errors.roll_number}</p>}
                </div>
              </>
            )}

            {/* Step 3: Phone */}
            {!isLogin && currentStep === 3 && (
              <div className="space-y-2">
                <Label htmlFor="phone">Registered Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 9876543210"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  disabled={isLoading}
                  className="h-11"
                />
                {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                <p className="text-xs text-muted-foreground">
                  This will be used for important academic notifications
                </p>
              </div>
            )}

            {/* Step 4: Academic Info */}
            {!isLogin && currentStep === 4 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="course">Course / Program</Label>
                  <Select
                    value={formData.course}
                    onValueChange={(value) => updateFormData('course', value)}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select your course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course} value={course}>
                          {course}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.course && <p className="text-sm text-destructive">{errors.course}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year">Academic Year</Label>
                  <Select
                    value={formData.year.toString()}
                    onValueChange={(value) => updateFormData('year', parseInt(value))}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select your year" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6].map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          Year {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.year && <p className="text-sm text-destructive">{errors.year}</p>}
                </div>
              </>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              {!isLogin && currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevStep}
                  disabled={isLoading}
                  className="flex-1 h-11"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              )}
              
              <Button
                type="submit"
                className="flex-1 h-11"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLogin ? 'Sign In' : currentStep === 4 ? 'Complete Setup' : 'Continue'}
                {!isLogin && currentStep < 4 && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
            </div>
          </form>
          
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
            </span>
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setCurrentStep(1);
                setErrors({});
              }}
              className="text-primary hover:underline font-medium"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
