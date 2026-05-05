export interface IPlanResponse {
    id: string;
    name: string;
    display_name: string;
    description: string;
    expires_in_days: number;
    price_monthly: number;
    isActive: boolean;
    limits: IPlanLimits;
}

interface IPlanLimits {
    requests_per_minute: number;
    requests_per_hour: number;
    requests_per_day: number;
    requests_per_month: number;
    max_tokens_allowed: number;
    max_file_size_mb: number;
}