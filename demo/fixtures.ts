// Replace test-only fixtures during the public demo build.
import { getSampleDocuments } from './documents';

const documents = getSampleDocuments('zh-CN');
export const FIXTURE_WELCOME = documents[0].markdown;
export const FIXTURE_MATH_AND_DIAGRAMS = documents[2].markdown;
export const FIXTURE_SECURITY_VECTORS = documents[1].markdown;
