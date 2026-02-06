import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, User, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Student {
  id: string;
  name: string;
  grade: string;
  phone: string;
  boarded: boolean;
}

const initialStudents: Student[] = [
  { id: '1', name: 'الهنوف الحربي', grade: 'الصف الثالث', phone: '0512345678', boarded: false },
  { id: '2', name: 'سارة خالد', grade: 'الصف الخامس', phone: '0523456789', boarded: false },
  { id: '3', name: 'عبدالله فهد', grade: 'الصف الثاني', phone: '0534567890', boarded: false },
  { id: '4', name: 'نورة سعود', grade: 'الصف الرابع', phone: '0545678901', boarded: false },
];

const DriverStudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(initialStudents);

  const toggleBoarded = (studentId: string) => {
    setStudents(prev =>
      prev.map(student =>
        student.id === studentId
          ? { ...student, boarded: !student.boarded }
          : student
      )
    );
  };

  const boardedCount = students.filter(s => s.boarded).length;

  return (
    <div className="space-y-4">
      {/* Stats header */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-l from-primary/10 to-secondary/20 border border-primary/20">
        <div>
          <p className="text-sm text-muted-foreground">الطلاب في الباص</p>
          <p className="text-2xl font-bold text-primary">
            {boardedCount} <span className="text-base font-normal text-muted-foreground">/ {students.length}</span>
          </p>
        </div>
        <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center shadow-custom-md">
          <User className="w-7 h-7 text-primary-foreground" />
        </div>
      </div>

      {/* Student list */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {students.map((student, index) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "relative p-4 rounded-2xl border shadow-custom-sm transition-all duration-300",
                student.boarded
                  ? "bg-success/5 border-success/30"
                  : "bg-card border-border"
              )}
            >
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center transition-colors",
                    student.boarded ? "bg-success/20" : "bg-muted"
                  )}
                >
                  <User
                    className={cn(
                      "w-6 h-6",
                      student.boarded ? "text-success" : "text-muted-foreground"
                    )}
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{student.name}</h3>
                  <p className="text-sm text-muted-foreground">{student.grade}</p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                    <Phone className="w-3 h-3" />
                    <span dir="ltr">{student.phone}</span>
                  </div>
                </div>

                {/* Board button */}
                <button
                  onClick={() => toggleBoarded(student.id)}
                  className={cn(
                    "px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2",
                    student.boarded
                      ? "bg-success text-success-foreground shadow-custom-sm"
                      : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-custom-md"
                  )}
                >
                  {student.boarded ? (
                    <>
                      <Check className="w-4 h-4" />
                      تم الركوب
                    </>
                  ) : (
                    'تأكيد الركوب'
                  )}
                </button>
              </div>

              {/* Success checkmark overlay */}
              {student.boarded && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -left-2 -top-2 w-6 h-6 rounded-full bg-success flex items-center justify-center shadow-custom-sm"
                >
                  <Check className="w-4 h-4 text-success-foreground" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DriverStudentList;
