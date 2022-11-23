import ValidationError from "./ValidationError";
import NoDocError from "./NoDoc";

export function errorHandler (error, res) {
    switch (error.constructor.name) {
        case "ValidationError": return res.status(405).json({
            type: error.name,
            msg: error.message
        });

        case "NoDocError": return res.status(405).json({
            type: error.name,
            msg: error.message
        });
            
        default: return res.status(500).json({
            type: error.name,
            msg: error.message
        });
    }
}

export { ValidationError, NoDocError }