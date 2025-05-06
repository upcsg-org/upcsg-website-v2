import { Announcement } from "./announcement";
import { Internship } from "./internship";
import { Scholarship } from "./scholarship";
import { Event } from "./event";

export interface DashboardData {
    id?: string | number;
    announcement: {
        count: number;
        most_recent: Announcement;
    };
    event: {
        count: number;
        most_recent: Event;
    };
    scholarship: {
        count: number;
        most_recent: Scholarship;
    };
    internship: {
        count: number;
        most_recent: Internship;
    };
}
