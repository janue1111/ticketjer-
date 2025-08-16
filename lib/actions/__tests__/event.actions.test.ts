import { describe, it, expect, vi } from 'vitest';
import { createEvent } from '../event.actions';
import Event from '../../database/models/event.model';
import User from '../../database/models/user.model';

// Mockear dependencias externas (Next.js, Mongoose)
vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

vi.mock('../../database', () => ({
  connectToDatabase: vi.fn(),
}));

vi.mock('../../database/models/event.model');
vi.mock('../../database/models/user.model');

describe('createEvent', () => {
  const validUserId = '655b9365e6dd85379942427c'; // ObjectId válido de 24 caracteres
  const path = '/events';

  it('should create an event successfully with valid data', async () => {
    // Arrange (Preparar)
    const mockEventData = {
      title: 'Test Event',
      description: 'A great event',
      organizer: validUserId,
      // ...otros campos requeridos
    };

    // Simular que el usuario organizador existe
    (User.findById as vi.Mock).mockResolvedValue({ _id: validUserId, name: 'Test User' });
    // Simular que Event.create retorna el evento creado
    (Event.create as vi.Mock).mockResolvedValue({ ...mockEventData, _id: 'event456' });

    // Act (Actuar)
    const result = await createEvent({ event: { ...mockEventData }, userId: validUserId, path });

    // Assert (Verificar)
    expect(User.findById).toHaveBeenCalledWith(validUserId);
    expect(Event.create).toHaveBeenCalledWith({ ...mockEventData, organizer: validUserId });
    expect(result).toEqual({ ...mockEventData, _id: 'event456' });
  });

  it('should throw an error if required data is missing', async () => {
    // Arrange (Preparar)
    const incompleteEventData = {
      title: 'Test Event',
      // description está ausente
    };

    // Simular que el usuario organizador existe
    (User.findById as vi.Mock).mockResolvedValue({ _id: validUserId, name: 'Test User' });
    // Simular que Mongoose lanza un error de validación al intentar crear el evento
    (Event.create as vi.Mock).mockImplementation(() => {
      throw new Error('Event validation failed: description is required');
    });

    // Act & Assert (Actuar y Verificar)
    // Verificamos que la función lance la excepción esperada
    await expect(createEvent({ event: incompleteEventData, userId: validUserId, path }))
      .rejects
      .toThrow('Event validation failed: description is required');
  });
});
