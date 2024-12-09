'use client';
import React, { useState } from 'react';
import Directories from '@/components/poolFlow/Directories';

const Flow = () => {
    const [step, setStep] = useState(1);

    const goToNextStep = () => {
        setStep(step + 1);
    };

    const goToPreviousStep = () => {
        setStep(step - 1);
    };

    return (
        <div>
            {step === 1 && <Directories onBack={goToPreviousStep} onNext={goToNextStep} />}
        </div>
    );
};

export default Flow;
