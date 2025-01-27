export const errorHandler = async (err, req, res, next) => {
    if (err.name === "ZodError") {
        res.status(400).json({ error: err.issues });
        return;
    }
    res.status(400).json({
        error: { message: err.message, code: err.code },
    });
};
