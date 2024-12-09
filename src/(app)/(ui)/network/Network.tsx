'use client';
import React, { useState } from 'react';
import SMBList from '@/components/NetworkFlow/SMBlist';

const NetworkFlow = () => {
    const [step, setStep] = useState(1);

    const goToNextStep = () => {
        setStep(step + 1);
    };

    const goToPreviousStep = () => {
        setStep(step - 1);
    };

    return (
        <div>
            {step === 1 && <SMBList />}
        </div>
    );
};

export default NetworkFlow;
