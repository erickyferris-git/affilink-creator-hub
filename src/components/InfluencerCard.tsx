
import React from 'react';
import { Influencer } from '../types';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Copy, Link } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface InfluencerCardProps {
  influencer: Influencer;
}

const InfluencerCard: React.FC<InfluencerCardProps> = ({ influencer }) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const getSocialIcon = (type: string) => {
    switch (type) {
      case 'instagram':
        return 'instagram';
      case 'tiktok':
        return 'tiktok';
      case 'youtube':
        return 'youtube';
      case 'twitter':
        return 'twitter';
      default:
        return 'link';
    }
  };

  const copyToClipboard = () => {
    if (influencer.affiliateLink) {
      navigator.clipboard.writeText(influencer.affiliateLink);
      toast.success(`Copied affiliate link for ${influencer.name}`);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <img
              alt={influencer.name}
              src={influencer.avatar}
              className="h-full w-full object-cover"
            />
          </Avatar>
          <div>
            <div className="font-semibold">{influencer.name}</div>
            <div className="flex space-x-2 text-xs text-muted-foreground">
              {influencer.socialChannels.map((channel, idx) => (
                <a
                  key={idx}
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {channel.handle}
                </a>
              ))}
            </div>
          </div>
        </div>
        {influencer.affiliateLink && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={copyToClipboard}
                  className="h-8 w-8 rounded-full copy-button"
                >
                  <Link className="h-4 w-4 text-primary" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy affiliate link</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-xs text-muted-foreground mb-4">
          <span className="font-medium text-foreground">Deliverables: </span>
          {influencer.deliverables.join(', ')}
        </div>
        
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="flex flex-col">
            <span className="text-sm font-medium">{formatNumber(influencer.metrics.followers)}</span>
            <span className="text-xs text-muted-foreground">Followers</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{influencer.metrics.engagement}%</span>
            <span className="text-xs text-muted-foreground">Engagement</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{formatNumber(influencer.metrics.averageLikes)}</span>
            <span className="text-xs text-muted-foreground">Avg. Likes</span>
          </div>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-1">
          {influencer.socialChannels.map((channel, idx) => (
            <Badge key={idx} variant="outline" className="text-xs">
              {channel.type}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default InfluencerCard;
