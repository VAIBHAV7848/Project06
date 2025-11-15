import React, { useState } from 'react';
import { DonationCampaign } from '../types';
import Card from './Card';

const DonationModal: React.FC<{
    campaign: DonationCampaign;
    onClose: () => void;
    onDonate: (campaignId: string, amount: number) => void;
}> = ({ campaign, onClose, onDonate }) => {
    const [amount, setAmount] = useState('');

    const handleSubmit = () => {
        const numericAmount = parseInt(amount, 10);
        if (!isNaN(numericAmount) && numericAmount > 0) {
            onDonate(campaign.id, numericAmount);
            onClose();
        } else {
            alert("Please enter a valid amount.");
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
                <h2 className="text-2xl font-bold mb-2">Donate to Initiative</h2>
                <h3 className="text-lg font-semibold text-[var(--accent-blue)] mb-6">{campaign.title}</h3>
                <div className="space-y-4">
                    <label htmlFor="amount" className="block text-sm font-medium text-[var(--text-secondary)]">Amount (₹)</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full p-3 rounded-lg input-high-tech"
                        placeholder="e.g., 500"
                    />
                </div>
                <div className="flex justify-end space-x-4 mt-8">
                    <button onClick={onClose} className="btn-base btn-secondary">Cancel</button>
                    <button onClick={handleSubmit} className="btn-base btn-primary">Confirm Donation</button>
                </div>
            </Card>
        </div>
    );
};


const DonationCard: React.FC<{ campaign: DonationCampaign, onDonateClick: () => void }> = ({ campaign, onDonateClick }) => {
  const progress = Math.min((campaign.raised / campaign.goal) * 100, 100);

  return (
    <Card className="flex flex-col overflow-hidden" padding="p-0">
      <img className="h-48 w-full object-cover" src={campaign.imageUrl} alt={campaign.title} />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white">{campaign.title}</h3>
        <p className="mt-2 text-[var(--text-secondary)] text-sm flex-grow">{campaign.description}</p>
        <div className="mt-4">
          <div className="flex justify-between items-center text-sm font-medium text-[var(--text-secondary)]">
            <span>₹{campaign.raised.toLocaleString()}</span>
            <span>₹{campaign.goal.toLocaleString()}</span>
          </div>
          <div className="w-full bg-black/30 rounded-full h-2 mt-1 overflow-hidden border border-cyan-500/20">
            <div 
              className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full rounded-full transition-all duration-500 ease-out animate-pulse" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <button onClick={onDonateClick} className="mt-6 w-full btn-base btn-primary">
          Donate Now
        </button>
      </div>
    </Card>
  );
};

interface DonationBridgeProps {
    campaigns: DonationCampaign[];
    onDonate: (campaignId: string, amount: number) => void;
}

const DonationBridge: React.FC<DonationBridgeProps> = ({ campaigns, onDonate }) => {
  const [selectedCampaign, setSelectedCampaign] = useState<DonationCampaign | null>(null);

  return (
    <div>
      {selectedCampaign && <DonationModal campaign={selectedCampaign} onClose={() => setSelectedCampaign(null)} onDonate={onDonate} />}
      <h1 className="text-3xl font-bold mb-6 text-white tracking-wider">DONATION BRIDGE</h1>
      <p className="mb-8 text-[var(--text-secondary)] max-w-4xl">
        Support student initiatives, campus development, and help foster a culture of giving back. Every contribution makes a significant impact on our university community.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {campaigns.map(campaign => <DonationCard key={campaign.id} campaign={campaign} onDonateClick={() => setSelectedCampaign(campaign)} />)}
      </div>
    </div>
  );
};

export default DonationBridge;