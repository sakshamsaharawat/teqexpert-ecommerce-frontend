export const removeKeysByValues = (obj: Record<string, any>, valuesToRemove: any[]): any => {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => !valuesToRemove.includes(value))
    );
}
