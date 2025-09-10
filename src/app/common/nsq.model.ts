export interface NSQStatus {
    node: string;
    hostname: string;
    topic_name: string;
    depth: number;
    memory_depth: number;
    backend_depth: number;
    message_count: number;
    nodes: Node[];
    channels: Channel2[];
    paused: boolean;
    e2e_processing_latency: E2eProcessingLatency4;
    message: string;
}


export interface E2eProcessingLatency {
    count: number;
    percentiles?: any;
    topic: string;
    channel: string;
    host: string;
}

export interface Channel {
    node: string;
    hostname: string;
    topic_name: string;
    channel_name: string;
    depth: number;
    memory_depth: number;
    backend_depth: number;
    in_flight_count: number;
    deferred_count: number;
    requeue_count: number;
    timeout_count: number;
    message_count: number;
    client_count: number;
    nodes?: any;
    clients?: any;
    paused: boolean;
    e2e_processing_latency: E2eProcessingLatency;
}

export interface E2eProcessingLatency2 {
    count: number;
    percentiles?: any;
    topic: string;
    channel: string;
    host: string;
}

export interface Node {
    node: string;
    hostname: string;
    topic_name: string;
    depth: number;
    memory_depth: number;
    backend_depth: number;
    message_count: number;
    nodes?: any;
    channels: Channel[];
    paused: boolean;
    e2e_processing_latency: E2eProcessingLatency2;
}

export interface E2eProcessingLatency3 {
    count: number;
    percentiles?: any;
    topic: string;
    channel: string;
    host: string;
}

export interface Channel2 {
    node: string;
    hostname: string;
    topic_name: string;
    channel_name: string;
    depth: number;
    memory_depth: number;
    backend_depth: number;
    in_flight_count: number;
    deferred_count: number;
    requeue_count: number;
    timeout_count: number;
    message_count: number;
    client_count: number;
    nodes?: any;
    clients?: any;
    paused: boolean;
    e2e_processing_latency: E2eProcessingLatency3;
}

export interface E2eProcessingLatency4 {
    count: number;
    percentiles?: any;
    topic: string;
    channel: string;
    host: string;
}

export interface Data {
    name: string;
    email: string;
    subscriptionType: string;
    paymentMethod: string;
    apiRequests: number;
    apiRequestsDate: string;
    dailyRateLimit: number;
    inviteToken: string;
    inviteTokenClicked: number;
}

export interface IEodApiStatus {
    datetime: Date;
    code: string;
    data: Data;
}
export class EodApiStatus implements IEodApiStatus {
    code: string;
    datetime: Date;
    data: Data;
    constructor(code: string, datetime: Date, data: Data) {
        this.code = code;
        this.datetime = datetime;
        this.data = data;
    }
}
