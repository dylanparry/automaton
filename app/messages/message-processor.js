import MetadataMessage from './metadata-message';

export default class MessageProcessor {
    static metadataBuffer;

    static process(message) {
        // Get the header and value
        const header = message.slice(0, 1);
        const value = message.slice(2);

        // Proccess the message according to its type
        switch (header) {
            case 'M':
                // If the current part isn't the final part
                if (parseInt(value.slice(0, 2), 16) !== parseInt(value.slice(3, 5), 16) - 1) {
                    // If this is the first part of the message
                    if (parseInt(value.slice(0, 2), 16) === 0) {
                        // Set the buffer to a new string
                        this.metadataBuffer = value.slice(6);
                    }
                    else {
                        // Add the message to the buffer
                        this.metadataBuffer += value.slice(6);
                    }
                }
                else {
                    // We've got the full message, so process it
                    return new MetadataMessage(
                        this.metadataBuffer || value.slice(6),
                    );
                }
                break;
            default:
                break;
        }

        return null;
    }
}
