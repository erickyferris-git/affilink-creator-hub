
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Edit, Tag } from 'lucide-react';

interface AffiliateStatusProps {
  onEditClick: () => void;
  programName: string;
}

const AffiliateStatus: React.FC<AffiliateStatusProps> = ({ onEditClick, programName }) => {
  return (
    <Alert className="bg-purple-50 border-purple-200 mb-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Tag className="h-5 w-5 mr-2 text-purple-700" />
          <div>
            <AlertTitle className="text-purple-700">Affiliate Links Enabled</AlertTitle>
            <AlertDescription className="text-purple-600">
              Program: {programName}
            </AlertDescription>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={onEditClick} className="border-purple-300 text-purple-700 hover:bg-purple-100 hover:text-purple-800">
          <Edit className="h-3.5 w-3.5 mr-1" />
          Edit
        </Button>
      </div>
    </Alert>
  );
};

export default AffiliateStatus;
