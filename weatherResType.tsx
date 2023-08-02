export type WeatherData = {
    Headline: {
      EffectiveDate: string;
      EffectiveEpochDate: number;
      Severity: number;
      Text: string;
      Category: string;
      EndDate: string;
      EndEpochDate: number;
      MobileLink: string;
      Link: string;
    };
    DailyForecasts: {
      Date: string;
      EpochDate: number;
      Temperature: {
        Minimum: {
          Value: number;
          Unit: string;
          UnitType: number;
        };
        Maximum: {
          Value: number;
          Unit: string;
          UnitType: number;
        };
      };
      Day: {
        Icon: number;
        IconPhrase: string;
        HasPrecipitation: boolean;
        PrecipitationType?: string;
        PrecipitationIntensity?: string;
      };
      Night: {
        Icon: number;
        IconPhrase: string;
        HasPrecipitation: boolean;
        PrecipitationType?: string;
        PrecipitationIntensity?: string;
      };
      Sources: string[];
      MobileLink: string;
      Link: string;
    }
  };