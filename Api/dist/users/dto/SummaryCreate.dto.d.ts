declare class SummaryDto {
    name: string;
    description: string;
    date: string;
    presence: boolean;
    justification: string;
    evaluation: {
        name: string;
        endDate: string;
        deliverWork: string[];
    };
}
export default SummaryDto;
