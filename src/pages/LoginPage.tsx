import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bus, Eye, EyeOff, Phone, Lock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    navigate('/home');
  };

  return (
    <div className="min-h-screen gradient-hero flex flex-col">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-40 left-5 w-24 h-24 bg-secondary/30 rounded-full blur-2xl" />
        <div className="absolute bottom-40 right-5 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Header with logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 flex flex-col items-center justify-center px-6 pt-16 pb-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-28 h-28 rounded-3xl gradient-primary flex items-center justify-center shadow-custom-lg mb-6"
        >
          <Bus className="w-14 h-14 text-primary-foreground" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-bold text-foreground mb-2"
        >
          مساري آمن
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-muted-foreground text-center mb-2"
        >
          تتبع الحافلة المدرسية بكل سهولة وأمان
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-1 text-xs text-primary"
        >
          <Sparkles className="w-3 h-3" />
          <span>راحة البال لأولياء الأمور</span>
        </motion.div>
      </motion.div>

      {/* Login form */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="bg-card rounded-t-[2.5rem] px-6 py-8 shadow-custom-lg"
      >
        <h2 className="text-xl font-semibold text-foreground mb-6 text-center">
          تسجيل الدخول
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Phone input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              رقم الجوال
            </label>
            <div className="relative">
              <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="tel"
                placeholder="05xxxxxxxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pr-12 h-14 rounded-xl bg-muted/50 border-border focus:border-primary text-right"
                dir="ltr"
              />
            </div>
          </div>

          {/* Password input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              كلمة المرور
            </label>
            <div className="relative">
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-12 pl-12 h-14 rounded-xl bg-muted/50 border-border focus:border-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Forgot password */}
          <div className="text-left">
            <button type="button" className="text-sm text-primary hover:underline">
              نسيت كلمة المرور؟
            </button>
          </div>

          {/* Login button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-14 rounded-xl text-base font-semibold gradient-primary hover:opacity-90 transition-opacity shadow-custom-md"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-6 h-6 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
              />
            ) : (
              'تسجيل الدخول'
            )}
          </Button>
        </form>

        {/* Sign up link */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          ليس لديك حساب؟{' '}
          <button className="text-primary font-medium hover:underline">
            إنشاء حساب جديد
          </button>
        </p>

        {/* Safe space for home indicator */}
        <div className="h-6" />
      </motion.div>
    </div>
  );
};

export default LoginPage;
