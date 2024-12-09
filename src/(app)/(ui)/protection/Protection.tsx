'use client';
import React, { useState } from 'react';
import ProtectionOn from '@/components/protectionFlow/ProtectionOn';
import ProtectioOptions from '@/components/protectionFlow/ProtectioOptions';
import ProtectionListTable from '@/components/protectionFlow/ProtectionListTable';
import ListDetailTable from '@/components/protectionFlow/ListDetailTable';
const Protection = () => {
    const [step, setStep] = useState(1);

    const goToNextStep = () => {
        setStep(step + 1);
    };

    const goToPreviousStep = () => {
        setStep(step - 1);
    };

    return (
        <>
            {step === 1 && <ProtectionOn onNext={goToNextStep} onBack={goToPreviousStep} />}
            {step === 2 && <ProtectioOptions onNext={goToNextStep} onBack={goToPreviousStep} />}
            {step === 3 && <ProtectionListTable onNext={goToNextStep} onBack={goToPreviousStep}  />}
            {step === 4 && <ListDetailTable onBack={goToPreviousStep} />}
        </>
    );
};

export default Protection
