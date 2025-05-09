
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { influencers, programs } from '@/data/mockData';
import { Influencer, AffiliateFormData } from '@/types';
import InfluencerCard from '@/components/InfluencerCard';
import AffiliateForm from '@/components/AffiliateForm';
import AffiliateStatus from '@/components/AffiliateStatus';

const Index = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [affiliateEnabled, setAffiliateEnabled] = useState(false);
  const [influencersList, setInfluencersList] = useState<Influencer[]>(influencers);
  const [currentProgram, setCurrentProgram] = useState('');
  const [formData, setFormData] = useState<AffiliateFormData | null>(null);

  const handleEnableAffiliate = () => {
    setIsFormOpen(true);
  };

  const handleFormSubmit = (data: AffiliateFormData) => {
    setFormData(data);
    setAffiliateEnabled(true);
    setIsFormOpen(false);
    
    // Get the selected program name for display
    const program = programs.find(p => p.id === data.programId);
    if (program) {
      setCurrentProgram(program.name);
    }
    
    // Generate affiliate links for all influencers
    const updatedInfluencers = influencersList.map(influencer => {
      const program = programs.find(p => p.id === data.programId);
      if (!program) return influencer;
      
      // Build UTM parameters
      const utmSource = influencer.name.toLowerCase().replace(/\s+/g, '-');
      const discountParam = data.discount.type === 'percentage' 
        ? `discount_percent=${data.discount.value}` 
        : `discount_amount=${data.discount.value}`;
      
      const baseUrl = program.baseUrl;
      const params = data.itemParams ? `&${data.itemParams}` : '';
      
      const affiliateLink = `${baseUrl}?utm_source=${utmSource}&utm_medium=affiliate&utm_campaign=influencer&${discountParam}${params}`;
      
      return {
        ...influencer,
        affiliateLink,
      };
    });
    
    setInfluencersList(updatedInfluencers);
  };

  const handleEditAffiliate = () => {
    setIsFormOpen(true);
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Influencer Management</h1>
        <p className="text-gray-600 mb-6">
          Manage your influencer campaigns and generate affiliate links
        </p>
        
        {affiliateEnabled ? (
          <AffiliateStatus 
            onEditClick={handleEditAffiliate} 
            programName={currentProgram}
          />
        ) : (
          <Button 
            onClick={handleEnableAffiliate}
            className="mb-6 bg-purple-600 hover:bg-purple-700"
          >
            Enable Affiliate Links
          </Button>
        )}
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {influencersList.map((influencer) => (
          <InfluencerCard key={influencer.id} influencer={influencer} />
        ))}
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <AffiliateForm
          onSubmit={handleFormSubmit}
          onCancel={() => setIsFormOpen(false)}
        />
      </Dialog>
    </div>
  );
};

export default Index;
