import { beforeEach, describe, test, expect, vi, it } from 'vitest';
import AbstractUseCase from '../../../src/app/useCase/AbstractUseCase';
import IError from '../../../src/domain/error/IError';
import { JSONSchemaType, ValidateFunction } from 'ajv';
import Ajv from 'ajv';

describe("AbstractUseCase", () => {
    
    const mockRepository = {};
    let abstractUseCase : AbstractUseCase;
    
    beforeEach(() => {
        abstractUseCase = new AbstractUseCase(mockRepository);
    })

    it('On create get the repository', () => {
        expect(abstractUseCase.repository).equal(mockRepository);
    });

    it("setErrors should created error with specified type", () => {
        abstractUseCase.setError({message: 'It is an internal server error', type: 'InternalServerError'});

        expect(abstractUseCase.hasErrors()).toBeTruthy();
    })

    it("setErrors should return nothing if errors is not passed", () => {
        const result = abstractUseCase.setErrors(undefined);

        expect(result).toBeUndefined();
        expect(abstractUseCase.getErrors().length).toBe(0);
    })

    it("Should set error if schema validation result in error", () => {
        const ajv = new Ajv();
        interface Foo {
            foo: number
        }

        const MockSchema: JSONSchemaType<Foo> = {
            type: "object",
            properties: { foo: { type: "number" } },
            required: ["foo"],
            additionalProperties: false,
        }

        const validate = ajv.compile<Foo>(MockSchema);
                
        abstractUseCase.validateSchema(validate, {id: 0});
        expect(abstractUseCase.hasErrors()).toBeTruthy();
    })

    it("clearErrors", () => {
        abstractUseCase.clearErrors();
        expect(abstractUseCase.getErrors().length).toBe(0);
        abstractUseCase.setErrors([{ message: "test"}]);
        abstractUseCase.clearErrors();
        expect(abstractUseCase.getErrors().length).toBe(0);
    })
})